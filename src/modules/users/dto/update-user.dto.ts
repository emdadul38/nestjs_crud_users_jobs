import { createUserDTO } from './create-user.dto';
import { PartialType, OmitType } from '@nestjs/mapped-types';

export class updateUserDTO extends PartialType(
  OmitType(createUserDTO, ['accountType', 'metafields'])
) {}
