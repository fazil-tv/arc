

import { NextFunction, Request, Response } from "express";
import { ContractorSignupUseCase,ContractorLoginUseCase } from "../../usecases/contractor";
import Getcontractorusecase from "../../usecases/contractor/getContractorusecase";

export class ContractorController {

    constructor(
        private contractorSignupUseCase: ContractorSignupUseCase,
        private contractorLoginUseCase: ContractorLoginUseCase,
        private getcontractorusecase: Getcontractorusecase
    ) { }


    async signup(req: Request, res: Response, next: NextFunction): Promise<void> {

        const { username, email, password } = req.body;

        try {

            const response = await this.contractorSignupUseCase.execute(username, email, password);

            const user = response.savedUser;

            const token = response.token
            const refreshtoken = response.refreshtoken
        

            if (!user) {
                res.status(400).json({ success: false, message: "User creation failed" });
            }

        
            if (user) {

                res.cookie('token', response.token, {
            
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 24 * 60 * 60 * 1000,
                });

                res.cookie('refreshToken', response.refreshtoken, {
                
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                });

                res.status(200).json({ success: true, token,refreshtoken });

            } else {
                res.status(404).json({ success: false, message: 'User not found'});
            }

        } catch (error) {
            res.status(404).json({ success: false});
            next(error);
        }
    }

    
    async login(req: Request, res: Response, next: NextFunction): Promise<void> {

        const { email, password } = req.body;
        console.log(email,"email");
        try {

            const user = await this.contractorLoginUseCase.execute(email, password);


            

            if (user) {

                res.cookie('token', user.token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 24 * 60 * 60 * 1000,
                });

                res.cookie('refreshToken', user.refreshtoken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                });

                res.status(200).json({ success: true, user });

            } else {

                res.status(404).json({ success: false, message: 'User not found' });

            }
        } catch (error) {

            next(error);

        }
    }

    public async getAllcontractor(req: Request, res: Response): Promise<void> {
        try {
            const users = await this.getcontractorusecase.getAllcontractors();

            console.log(users,"contractorrrrrrrrr")

            if (users.length > 0) {
                res.status(200).json({ success: true, users });
            } else {
                res.status(404).json({ success: false, message: 'No users found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }


    




}