
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class LoginInput {
    email: string;
    password: string;
}

export class RegisterInput {
    name: string;
    email: string;
    password: string;
}

export class AuthData {
    user?: UserType;
    token?: string;
}

export abstract class IMutation {
    abstract Register(data?: RegisterInput): AuthData | Promise<AuthData>;
}

export abstract class IQuery {
    abstract Login(data?: LoginInput): AuthData | Promise<AuthData>;
}

export class UserType {
    id?: string;
    name?: string;
    email?: string;
    active?: boolean;
}
