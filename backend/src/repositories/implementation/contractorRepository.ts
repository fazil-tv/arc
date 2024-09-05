import { Contractor } from '../../entities/contractorEntity';
import { contractorModel,IContractorData } from '../../infrastructure/db';
import { IContractorRepository } from '../interface/contractorinterface';



export class ContractorRepository implements IContractorRepository {



  async getAll(): Promise<IContractorData[] | null> {
    try {
      return await contractorModel.find();
    } catch (error) {
      throw new Error("error in db");
    }
  }

  async findByEmail(email: string): Promise<IContractorData | null> {

    try {
      const user = await contractorModel.findOne({ email });

      if (!user) return null;

      return user;

    } catch (error) {
      console.log(error, "error");
      return null;
    }
  }


  async save(Contractor:Contractor): Promise<Contractor> {
    try {
      const newContractor = new contractorModel(Contractor);
      await newContractor.save();
      return Contractor;
    } catch (error) {
      console.log(error);
      throw new Error("error in db");
    }
  }


//   async getCurrentUser(email: string): Promise<User | null> {
//     try {

//       const user = await userModel.findOne({ email }).exec();
//       return user ? user : null;

//     } catch (error) {
//       console.error('Error retrieving current user:', error);
//       return null;
//     }
//   }

//   async updateUserOtpVerified(userId: string, verified: boolean): Promise<void> {
//     try {
//       await userModel.updateOne(
//         { _id: userId },
//         { $set: { 'otp.verified': verified } }
//       ).exec();
//     } catch (error) {
//       throw new Error('Error updating OTP verification status in the database');
//     }
//   }


//   async create(googleUser: Partial<IUserData>): Promise<IUserData>  {
//     try {
//         if (!googleUser.email || !googleUser.password) {
//             throw new Error("Missing required fields: email or password");
//         }

//         const user = new userModel({
//             username: googleUser.username ?? 'Unknown',
//             email: googleUser.email,
//             phone: googleUser.phone ?? null,
//             profileImg: googleUser.profileImg ?? null,
//             password: googleUser.password,
//             isBlocked: googleUser.isBlocked ?? false,
//             otp: googleUser.otp ?? undefined 
//         });

//         return await user.save();
//     } catch (error) {
//       throw new Error(`Error creating new user: ${error}`);
//     }
// }



}