import { createUserDTO } from './create-user.dto';
declare const updateUserDTO_base: import("@nestjs/mapped-types").MappedType<Partial<Omit<createUserDTO, "accountType" | "metafields">>>;
export declare class updateUserDTO extends updateUserDTO_base {
}
export {};
