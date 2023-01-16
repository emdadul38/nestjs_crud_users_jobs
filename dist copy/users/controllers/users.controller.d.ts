import { CreateUserDTO } from '../dto';
import { UsersService } from '../services/users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(createUserDto: CreateUserDTO): void;
    findAllUsers(): import("../interfaces").User[];
    findUser(id: number): import("../interfaces").User;
    updateUser(id: number, updateUserDto: CreateUserDTO): {
        message: string;
    };
    deleteUser(id: number): {
        message: string;
    };
}
