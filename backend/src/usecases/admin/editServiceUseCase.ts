import { Service } from '../../entities/serviceEntity';
import { ServiceRepository } from '../../repositories/interface/serviceinterface';

export class EditServiceUseCase {
  constructor(private serviceRepository: ServiceRepository) { }

  async execute(id: string, updatedService: Partial<Service>): Promise<Service | null> {
    console.log("updatedService", updatedService)
    return this.serviceRepository.editService(id, updatedService);
  }
}

