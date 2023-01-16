import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { AddressDTO } from '../../dto/address.dto';
import { ACCOUNT_STATUS, ACCOUNT_TYPE } from 'src/constants';

export class createUserDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  refreshToken: string;

  @IsString()
  @IsOptional()
  refreshtokenexpires?: string;

  @IsNumber()
  @IsOptional()
  age?: number;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsEnum(ACCOUNT_STATUS)
  @IsOptional()
  status?: ACCOUNT_STATUS;

  @IsEnum(ACCOUNT_TYPE)
  @IsNotEmpty()
  accountType: ACCOUNT_TYPE;

  @IsString({ each: true })
  @IsOptional()
  social?: string[];

  @IsBoolean()
  @IsOptional()
  isEmailVarified?: boolean;

  @Type(() => AddressDTO)
  @ValidateNested()
  @IsNotEmpty()
  address: AddressDTO;

  @IsOptional()
  metafields: Record<string, any> | any;
}
