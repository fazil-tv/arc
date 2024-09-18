import { Service } from '../../entities/serviceEntity';
import { ServiceRepository } from '../../repositories/interface/serviceinterface';

export class AddServiceUseCase {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute(service: Service): Promise<void> {
    await this.serviceRepository.addService(service);
  }
}

