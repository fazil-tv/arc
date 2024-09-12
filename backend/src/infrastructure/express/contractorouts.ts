import { Router } from "express";
const router = Router();
import { ContractorController } from "../../adapters/controllers";
import { ContractorSignupUseCase } from "../../usecases/contractor";
import { ContractorLoginUseCase } from "../../usecases/contractor";
import Getcontractorusecase from "../../usecases/contractor/getContractorusecase";

import { ContractorRepository } from "../../repositories";


const contractorRepository = new ContractorRepository();



const getcontractorusecase = new Getcontractorusecase(

);

const contractorSignupUseCase = new ContractorSignupUseCase(
    contractorRepository
);

const contractorLoginUseCase = new ContractorLoginUseCase(
    contractorRepository
);


const contractorController = new ContractorController(contractorSignupUseCase,contractorLoginUseCase,getcontractorusecase);


router.get("/contractor/getcontractor", (req, res) => {
    contractorController.getAllcontractor(req, res);
});

export default router;
