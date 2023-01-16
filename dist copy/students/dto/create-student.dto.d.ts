import { createUserDTO } from 'src/users/dto/create-user.dto';
export declare class CreateStudentDTO extends createUserDTO {
    university: string;
    course: string;
    gread?: string;
    isUnderInternship?: boolean;
}
