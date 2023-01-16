import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { createUserDTO } from '../../users/dto/create-user.dto';

export class CreateEmployerDTO extends createUserDTO {
  @IsString()
  @IsNotEmpty()
  company: string;

  @IsString()
  @IsOptional()
  size?: string;

  @IsString({ each: true })
  @IsOptional()
  workArea?: string;

  @IsString()
  @IsOptional()
  website?: string;
}
