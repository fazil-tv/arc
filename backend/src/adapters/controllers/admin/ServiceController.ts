import { Request, Response } from 'express';
import { AddServiceUseCase } from '../../../usecases/admin/addservices';
// import { GetAllServicesUseCase } from '../../application/use-cases/GetAllServices';
import { ServiceRepositoryImpl } from '../../../repositories/implementation/serviceRepository';

export class ServiceController {
    private serviceRepository: ServiceRepositoryImpl;
    private addServiceUseCase: AddServiceUseCase;
    // private getAllServicesUseCase: GetAllServicesUseCase;

    constructor() {
        this.serviceRepository = new ServiceRepositoryImpl();
        this.addServiceUseCase = new AddServiceUseCase(this.serviceRepository);
        // this.getAllServicesUseCase = new GetAllServicesUseCase(this.serviceRepository);
    }

    public async addService(req: Request, res: Response): Promise<void> {
        try {
            const serviceData = req.body;

            const imageFiles = req.files as Express.Multer.File[] | undefined;

            const imagePaths = imageFiles ? imageFiles.map((file) => file.filename) : [];

            const serviceDataWithImages = {
                ...serviceData,
                images: imagePaths
            };

            console.log(req.files, "req.files")
            console.log(serviceDataWithImages, "serviceDataWithImages")
            console.log(serviceData, "serviceData")

            await this.addServiceUseCase.execute(serviceDataWithImages);

            res.status(201).json({ success: true, message: 'Service added successfully' });
        } catch (error) {
            res.status(500).json({ success: true, message: 'Failed to add service' });
        }
    }

    // public async getAllServices(req: Request, res: Response): Promise<void> {
    //   try {
    //     const services = await this.getAllServicesUseCase.execute();
    //     res.status(200).send(services);
    //   } catch (error) {
    //     res.status(500).send({ error: 'Failed to retrieve services' });
    //   }
    // }
}
