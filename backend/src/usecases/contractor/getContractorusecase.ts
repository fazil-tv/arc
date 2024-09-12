import {Contractor} from '../../entities/contractorEntity'
import { ContractorRepository } from "../../repositories/implementation/contractorRepository";

export default class Getcontractorusecase {
    private contractorRepository: ContractorRepository;

    constructor() {
        this.contractorRepository = new ContractorRepository();
    }

    public async getAllcontractors(): Promise<Contractor[]> {
        try {
         
            const contractor = await this.contractorRepository.getAll();
            return contractor || [];
        } catch (error) {
            console.error('Error fetching users:', error);
            throw new Error('Error fetching users');
        }
    }
}
