export interface IUser {
    _id: string;
    createdAt: string;
    email: string;
    isBlocked: boolean;
    otp: IOtp;
    password: string;
    phone: string | null;
    profileImg: string | null;
    updatedAt: string;
    username: string;
    __v: number;
}

export interface IOtp {
    value: string;
    expirationTime: string;
    verified: boolean;
}
