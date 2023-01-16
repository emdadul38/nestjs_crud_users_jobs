import { Type } from 'class-transformer';
import { IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { JOB_TYPE } from '../../constants';
import { AddressDTO } from '../../dto';

export class CreateJobDTO {
  @IsMongoId()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  experience: number;

  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @IsString()
  @IsOptional()
  salary?: string;

  @IsEnum(JOB_TYPE)
  @IsNotEmpty()
  type: string;

  @Type(() => AddressDTO)
  @ValidateNested()
  @IsNotEmpty()
  location: AddressDTO;
}