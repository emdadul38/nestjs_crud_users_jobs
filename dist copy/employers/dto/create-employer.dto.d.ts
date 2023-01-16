import { createUserDTO } from 'src/users/dto/create-user.dto';
export declare class CreateEmployerDTO extends createUserDTO {
    company: string;
    size?: string;
    workArea?: string;
    website?: string;
}
