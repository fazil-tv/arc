import { Service } from "../../entities/serviceEntity";

export interface ServiceRepository {
  addService(service: Service): Promise<void>;
  getAllServices(): Promise<Service[]>;
}
