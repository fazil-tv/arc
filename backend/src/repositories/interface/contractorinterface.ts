import { Contractor } from '../../entities/contractorEntity';
import { IContractorData } from '../../infrastructure/db';

export interface IContractorRepository {

  findByEmail(emailId: string): Promise<IContractorData | null>;
  getAll(): Promise<IContractorData[] | null>;
  save(Contractor: Contractor): Promise<Contractor>

}