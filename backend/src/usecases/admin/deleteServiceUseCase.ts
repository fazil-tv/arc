import { ServiceRepository } from "../../repositories/interface/serviceinterface";

export class DeleteServiceUseCase {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute(id: string):Promise<boolean | null> {
    const result =  await this.serviceRepository.deleteService(id);
    return result ? true : null;
  }
}
