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
}
