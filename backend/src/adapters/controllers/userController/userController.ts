import { NextFunction, Request, Response } from "express";

import {
    SignupUseCase,
    LoginUseCase,
    SendOtp,
    VerifyOtpUseCaseImpl,
    GoogleSignUpUseCase
} from "../../../usecases/user"

import { googleAuthService } from "../../../services";
import { UserRepository } from "../../../repositories";


export class UserController {
    constructor(
        private signupUseCase: SignupUseCase,
        private LoginUseCase: LoginUseCase,
        private sendOtpUseCase: SendOtp,
        private verifyOtpUseCase: VerifyOtpUseCaseImpl,
        private googleSignUpUseCase: GoogleSignUpUseCase

    ) {}

    async signup(req: Request, res: Response, next: NextFunction): Promise<void> {

        console.log(req.body);

        const { username, email, password } = req.body;

        try {

            const response = await this.signupUseCase.execute(username, email, password);

            const user = response.savedUser;
            console.log(user);

            if (!user) {
                res.status(400).json({ success: false, message: "User creation failed" });
            }

            const otp = await this.sendOtpUseCase.execute(user);

            console.log("OTP sent:", otp.value);

        
            if (user) {

                res.status(200).json({ success: true, otpSent: true, user});

            } else {
                res.status(404).json({ success: false, message: 'User not found' });
            }


        } catch (error) {
            res.status(404).json({ success: false, otpSent: false });
            next(error);
        }
    }


    async login(req: Request, res: Response, next: NextFunction): Promise<void> {

        const { email, password } = req.body;
        try {
            const user = await this.LoginUseCase.execute(email, password);
            
    


            if (user) {

                res.cookie('token', user.token, {
                  
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 24 * 60 * 60 * 1000,
                });

                res.cookie('refreshToken', user.refreshtoken, {
                  
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

    async verifyOtp(req: Request, res: Response, next: NextFunction): Promise<void> {
        const verificationData = req.body;
        console.log(verificationData.otp, verificationData.email, "verification data")

        try {

            if (!verificationData.email || !verificationData.otp) {
                res.status(400).json({ message: 'Email and OTP code are required' });
                return;
            }

            const isValid = await this.verifyOtpUseCase.execute(verificationData.email, verificationData.otp);

            console.log(isValid, "isvalid");

            const token = isValid.token
            const refreshToken = isValid.refreshToken
            
            if (isValid) {
                res.cookie('token', isValid.token, {
                
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 24 * 60 * 60 * 1000,
                });

                res.cookie('refreshToken', isValid.refreshToken, {
                 
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                });

                
                res.status(200).json({ success: true, message: 'OTP verified successfully',token,refreshToken });
            } else {
                res.status(400).json({ success: false, message: 'Invalid OTP or email' });
            }

        } catch (error) {
            next(error);
        }
    }






    async googleSignIn(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {


            const { token } = req.body;

            if (token && token.access_token) {
                const accessToken = token.access_token;
                const token_type = token.token_type;
                console.log("Access Token:", accessToken);
                console.log(" token_type:", token_type);

                const googleUser = await this.googleSignUpUseCase.execute(accessToken, token_type);

                console.log(googleUser, "googleUser");

                if (googleUser) {

                    console.log("goggle user", googleUser.token);

                    res.cookie('token', googleUser.token, {
               
                        secure: process.env.NODE_ENV === 'production',
                        maxAge: 24 * 60 * 60 * 1000,
                    });

                    res.cookie('refreshToken', googleUser.refreshtoken, {
                      
                        secure: process.env.NODE_ENV === 'production',
                        maxAge: 7 * 24 * 60 * 60 * 1000,
                    });

                    res.status(200).json({ success: true, googleUser });

                }else{
                    res.status(404).json({ success: false, message: 'User not found' });


                }



            } else {
                console.log("Access token not found");
            }

        } catch (error) {
            next(error);
        }
    }
};

