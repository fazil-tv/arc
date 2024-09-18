import { Service } from '../../entities/serviceEntity';
import { ServiceRepository } from '../../repositories/interface/serviceinterface';

export class GetAllServicesUseCase {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute(): Promise<Service[]> {
    return this.serviceRepository.getAllServices();
  }
}
