import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AccountLoginDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}