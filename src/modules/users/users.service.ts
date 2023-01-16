import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { IUserModel, UserDocument, USER_MODEL } from '../schemas/user';
import { createUserDTO } from './dto/create-user.dto';
import { updateUserDTO } from './dto/update-user.dto';
import { AccountLoginDTO } from './dto/account-login.dto';
import { compare } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(USER_MODEL) private readonly userModel: IUserModel,
  ) {}

  async create(createUserDto: createUserDTO) {
    try {
      // check duplicate email address
      const user = await this.userModel.findOne({ email: createUserDto.email });
      if (user) {
        throw new ConflictException('Email already exists')
      }

      const createdUser = new this.userModel(createUserDto);
      return await createdUser.save();
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new BadRequestException(error.errors);
      }
      if(error.status === 409)
        throw new ConflictException(error.message);
      if(error.status === 400)
        throw new BadRequestException(error.message);
      if (error.status >= 500)
        throw new ServiceUnavailableException();
    }
  }

  async login(accountLoginDto: AccountLoginDTO){
    const { email, password } = accountLoginDto;
    const user = await this.userModel.findOne({ email }, '+password');
    if (!user) {
      throw new NotFoundException('User not found');
    }
    // }
    // const isMatch = await user.isValidPassword(password);
    // if (!isMatch) {
    //   throw new UnauthorizedException('Invalid credentials');
    // }
    const isMatch = await this.userModel.findByEmailAndPassword(email, password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async search(name: string) {
    const users: UserDocument[] = await this.userModel.find().byName(name);
    return users;
  }

  async findAll() {
    const users = await this.userModel.find();
    return users;
  }

  async findOneByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  
  async findOne(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: string, updateUserDto: updateUserDTO) {
    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async remove(id: string) {
    const deleteUser = await this.userModel.findByIdAndDelete(id);

    if (!deleteUser) {
      throw new NotFoundException('User not found');
    }

    return {
      _id: id,
    };
  }
}
