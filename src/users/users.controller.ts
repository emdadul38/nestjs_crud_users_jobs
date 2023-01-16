import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-aut.guard';
import { AuthService } from 'src/auth/auth.service';
import { createUserDTO } from './dto/create-user.dto';
import { updateUserDTO } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly authService: AuthService) {}

  @Post()
  create(@Body() createUserDto: createUserDTO) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Request() req) {
    const {_id, email} = req.user;
    console.log('login Controller: ', {_id, email});
    return this.authService.login({ _id, email });
  }

  // @Post('refresh-token')
  // async refreshToken(@Body('refreshToken') refreshToken: string) {
  //   return this.authService.refreshToken(refreshToken);
  // }

  @Get('search')
  search(@Query('name') name: string) {
    return this.usersService.search(name);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    console.log('req.user: ', req.user);
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log( typeof id )
    return this.usersService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: updateUserDTO) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
