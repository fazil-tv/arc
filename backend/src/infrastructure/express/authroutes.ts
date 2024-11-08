import { Router } from "express";
const router = Router();
import {UserController} from '../../adapters/controllers'
import { ContractorController } from "../../adapters/controllers";
import { AdminController } from "../../adapters/controllers";
import { SignupUseCase } from "../../usecases/user";
import { LoginUseCase } from "../../usecases/user";
import { VerifyOtpUseCaseImpl } from "../../usecases/user";
import { GoogleSignUpUseCase } from "../../usecases/user";
import { ContractorSignupUseCase } from "../../usecases/contractor";
import { ContractorLoginUseCase } from "../../usecases/contractor";
import Getcontractorusecase from "../../usecases/contractor/getContractorusecase";


import { SendOtp } from "../../usecases/user";
import { UserRepository,MongoOtpRepository,ContractorRepository } from "../../repositories";
import { OtpService } from "../../services";
import { NodemailerEmailService } from "../../services";


const emailService = new NodemailerEmailService();
const userRepository = new UserRepository();
const contractorRepository = new ContractorRepository();
const otpService = new OtpService(emailService); 
const otpRepository = new MongoOtpRepository(); 



const signupUseCase = new SignupUseCase(
    userRepository
);
const loginUseCase = new LoginUseCase(
    userRepository
);

const sendOtpUseCase = new SendOtp(
    otpService,
    otpRepository
);

const VerifyOtpUseCase = new VerifyOtpUseCaseImpl(
    userRepository
);
const googleSignUpUseCase = new GoogleSignUpUseCase(
    userRepository
);

const contractorSignupUseCase = new ContractorSignupUseCase(
    contractorRepository
);

const contractorLoginUseCase = new ContractorLoginUseCase(
    contractorRepository
);


const getcontractorusecase = new Getcontractorusecase(
    
);


const userController = new UserController(signupUseCase,loginUseCase,sendOtpUseCase,VerifyOtpUseCase,googleSignUpUseCase);
const contractorController = new ContractorController(contractorSignupUseCase,contractorLoginUseCase,getcontractorusecase);
const adminController = new AdminController();



router.post("/user/register", (req, res, next) => {
    console.log("Register route hit");
    userController.signup(req, res, next);
});

router.post("/user/login", (req, res, next) => {
    console.log("login route hit");
    userController.login(req, res, next);
});

router.post("/user/verifyotp", (req, res, next) => {
    console.log("verifyotp route hit");
    userController.verifyOtp(req, res, next);
});

router.post("/user/googleSignIn", (req, res, next) => {
    console.log("googleSignIn route hit");
    userController.googleSignIn(req, res, next);
});


router.post("/contractor/register", (req, res, next) => {
    console.log("contractor Register route hit");
    contractorController.signup(req, res, next);
});

router.post("/contractor/login", (req, res, next) => {
    console.log("contractor login route hit");
    contractorController.login(req, res, next);

});

router.post("/admin/login", (req, res, next) => {
    console.log("PPPPPPPPPPP{{{{{{{{{{{}}}}}}}}}}}");
    
    console.log("admin login route hit");

    adminController.login(req, res);

});

export default router;