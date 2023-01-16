import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { createUserDTO } from '../../users/dto/create-user.dto';

export class CreateStudentDTO extends createUserDTO {
  @IsString()
  @IsNotEmpty()
  university: string;

  @IsString()
  @IsNotEmpty()
  course: string;

  @IsString()
  @IsOptional()
  gread?: string;

  @IsBoolean()
  @IsOptional()
  isUnderInternship?: boolean;
}