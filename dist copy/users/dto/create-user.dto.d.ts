import { AddressDTO } from '../../dto/address.dto';
import { ACCOUNT_STATUS, ACCOUNT_TYPE } from 'src/constants';
export declare class createUserDTO {
    name: string;
    email: string;
    password: string;
    refreshToken: string;
    refreshtokenexpires?: string;
    age?: number;
    phone?: string;
    status?: ACCOUNT_STATUS;
    accountType: ACCOUNT_TYPE;
    social?: string[];
    isEmailVarified?: boolean;
    address: AddressDTO;
    metafields: Record<string, any> | any;
}
