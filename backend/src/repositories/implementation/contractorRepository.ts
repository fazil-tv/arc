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

  async findById(contractorId: string): Promise<IContractorData | null> {
    return await contractorModel.findById(contractorId).exec();
}

}