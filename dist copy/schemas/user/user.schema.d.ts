/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { ACCOUNT_STATUS, ACCOUNT_TYPE } from 'src/constants';
import { Address } from '../common';
import { Document, Model, Query } from 'mongoose';
export declare class User {
    name: string;
    email: string;
    password: string;
    refreshToken?: string;
    refreshtokenexpires?: string;
    age?: number;
    phone?: string;
    status?: ACCOUNT_STATUS;
    accountType: ACCOUNT_TYPE;
    social?: string[];
    isEmailVarified?: boolean;
    address: Address;
    metafields: Record<string, any> | any;
    isValidPassword: (candidatePassword: string) => Promise<boolean>;
}
export type UserDocument = User & Document;
export type UserModelQuery = Query<any, UserDocument, IUserQueryHelpers> & IUserQueryHelpers;
export interface IUserQueryHelpers {
    byName(this: UserModelQuery, name: string): UserModelQuery;
}
export interface IUserModel extends Model<UserDocument, IUserQueryHelpers> {
    findByEmailAndPassword: (email: string, password: string) => Promise<UserDocument | undefined>;
}
export declare const UserSchema: import("mongoose").Schema<User, Model<User, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User>;
export declare const USER_MODEL: string;
