import { Request, Response } from 'express';
import { AdminLoginUseCase } from '../../usecases';
import { AdminRepository } from '../../repositories/implementation/adminRepository';

export class AdminController {
    private adminLoginUseCase: AdminLoginUseCase;

    constructor() {
        // const adminRepository = new AdminRepository();

        this.adminLoginUseCase = new AdminLoginUseCase();
    }

    public async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;

            console.log(email,"email","password",password)
            const tokens = this.adminLoginUseCase.login(email, password);

            console.log(tokens,"token")

            if (tokens) {
                res.cookie('access_admin_token', tokens.accessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                });

                res.cookie('refresh_admin_token', tokens.refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                });

                res.status(200).json({success: true, message: 'Login successful' ,tokens});
            } else {
                res.status(401).json({success: false, error: 'Invalid credentials' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
