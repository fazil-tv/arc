import { ServiceRepository } from '../interface/serviceinterface';
import { Service } from '../../entities/serviceEntity';
import { ServiceModel } from '../../infrastructure/db/models/serviceModel';

export class ServiceRepositoryImpl implements ServiceRepository {
  async addService(service: Service): Promise<void> {
    const serviceDocument = new ServiceModel(service);
    await serviceDocument.save();
  }

  async getAllServices(): Promise<Service[]> {
    return ServiceModel.find().exec();
  }

  async editService(id: string, updatedService: Partial<Service>): Promise<Service | null> {
    return ServiceModel.findByIdAndUpdate(id, updatedService, { new: true }).exec();
  }


  async deleteService(id: string): Promise<boolean | null> {
    const result = await ServiceModel.findByIdAndDelete(id).exec();
  return result ? true : null; 
  }
}
