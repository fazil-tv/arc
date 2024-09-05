
export interface OTP {
    value: string;
    expirationTime: Date;
    verified: boolean;
}

export interface IUserData {
    _id?: any;
    username: string;
    email: string;
    phone: number | null;
    profileImg:string|null
    password: string;
    isBlocked:boolean
    otp?: OTP; 
    
}

export class User {
    save(): import("../infrastructure/db").IUserData | PromiseLike<import("../infrastructure/db").IUserData> {
      throw new Error('Method not implemented.');
    }
    _id?: any;
    username: string;
    email: string;
    phone: number | null;
    profileImg:string|null
    password: string;
    isBlocked:boolean
    otp?: OTP;

    constructor({ _id, username, email, phone, password,otp,profileImg ,isBlocked}: IUserData) {
        this._id = _id;
        this.username = username;
        this.email = email;
        this.phone = phone;
        this.profileImg = profileImg ?? null;
        this.password = password;
        this.isBlocked = isBlocked ?? false;
        this.otp = otp;

    }
}