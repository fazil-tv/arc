import { Service } from "../../entities/serviceEntity";

export interface ServiceRepository {
  addService(service: Service): Promise<void>;
  getAllServices(): Promise<Service[]>;
  editService(id: string, updatedService: Partial<Service>): Promise<Service | null>;
  deleteService(id: string): Promise<boolean |null>;
}
