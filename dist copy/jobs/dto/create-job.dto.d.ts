import { AddressDTO } from '../../dto';
export declare class CreateJobDTO {
    userId: string;
    companyName: string;
    title: string;
    description: string;
    experience: number;
    tags?: string[];
    salary?: string;
    type: string;
    location: AddressDTO;
}
