import { TRole } from "./user.interface";

export const Role: TRole[] = ['admin', 'user'];
export const USER_ROLES = {
    user : 'user',
    admin: 'admin'
} as const;

