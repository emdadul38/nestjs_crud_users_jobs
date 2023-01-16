import { IUserModel, UserDocument } from '../schemas/user';
import { createUserDTO } from './dto/create-user.dto';
import { updateUserDTO } from './dto/update-user.dto';
import { AccountLoginDTO } from './dto/account-login.dto';
export declare class UsersService {
    private readonly userModel;
    constructor(userModel: IUserModel);
    create(createUserDto: createUserDTO): Promise<import("../schemas/user").User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    login(accountLoginDto: AccountLoginDTO): Promise<import("../schemas/user").User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    search(name: string): Promise<UserDocument[]>;
    findAll(): Promise<(import("../schemas/user").User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findOneByEmail(email: string): Promise<import("../schemas/user").User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findOne(id: string): Promise<import("../schemas/user").User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(id: string, updateUserDto: updateUserDTO): Promise<import("../schemas/user").User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    remove(id: string): Promise<{
        _id: string;
    }>;
}
