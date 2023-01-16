import { AuthService } from 'src/auth/auth.service';
import { createUserDTO } from './dto/create-user.dto';
import { updateUserDTO } from './dto/update-user.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    private readonly authService;
    constructor(usersService: UsersService, authService: AuthService);
    create(createUserDto: createUserDTO): Promise<import("../schemas/user").User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    login(req: any): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    search(name: string): Promise<import("../schemas/user").UserDocument[]>;
    findAll(req: any): Promise<(import("../schemas/user").User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findOne(id: string): Promise<import("../schemas/user").User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(id: string, updateUserDto: updateUserDTO): Promise<import("../schemas/user").User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    remove(id: string): Promise<{
        _id: string;
    }>;
}
