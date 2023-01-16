import { User } from '../interfaces';
export declare class UsersService {
    private store;
    addUser(user: User): void;
    getUser(id: number): User;
    getUsers(): User[];
    updateUser(id: number, user: User): void;
    deleteUser(id: number): void;
}
