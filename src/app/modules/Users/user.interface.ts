import { Model } from "mongoose";
import { USER_ROLES } from "./user.constant";

export type TRole  = 'admin' | 'user';

export interface TUser {
    name: string;
    email:string;
    password:string;
    role: "admin" | "user";
    isBlocked: boolean;
}

export interface UserStaticModel extends Model<TUser> {
    isUserExists(id:string): Promise<TUser>;  
    isUserExistsByEmail(email:string):Promise<TUser>;
    isPasswordMaatched(plainTextPass:string, hashedPass:string): Promise<boolean>;
}

export interface TBlockUser {
    userId:string,
}

export type TUserRole = keyof typeof USER_ROLES;
  
