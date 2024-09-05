export interface IContractorData {
    _id?: any;
    username: string;
    email: string;
    phone: number | null;
    profileImg: string | null;
    password: string;
    isBlocked: boolean;
}

export class Contractor {
    _id?: any;
    username: string;
    email: string;
    phone: number | null;
    profileImg: string | null;
    password: string;
    isBlocked: boolean;

    constructor({ 
        _id, 
        username, 
        email, 
        phone, 
        profileImg, 
        password, 
        isBlocked
    }: IContractorData) {
        this._id = _id;
        this.username = username;
        this.email = email;
        this.phone = phone;
        this.profileImg = profileImg ?? null;
        this.password = password;
        this.isBlocked = isBlocked ?? false;
    }

    save(): import("../infrastructure/db").IContractorData | PromiseLike<import("../infrastructure/db").IContractorData> {
        throw new Error('Method not implemented.');
    }
    
}
