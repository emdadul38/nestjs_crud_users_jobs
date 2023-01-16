import { CreateJobDTO } from "./create-job.dto";
declare const UpdateJobDTO_base: import("@nestjs/mapped-types").MappedType<Partial<Omit<CreateJobDTO, "userId">>>;
export declare class UpdateJobDTO extends UpdateJobDTO_base {
}
export {};
