import { Schema, model, Document } from "mongoose";


export interface IContractorData extends Document {
    username: string;
    email: string;
    phone: number | null;
    profileImg: string | null;
    password: string;
    isBlocked: boolean;
}

const contractorSchema = new Schema<IContractorData>(
    {
        username: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: Number, default: null },
        profileImg: { type: String, default: null },
        password: { type: String, required: true },
        isBlocked: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

export default model<IContractorData>("Contractor", contractorSchema);
