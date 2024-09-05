
import { AdminCredentials } from '../../entities';
import { AdminRepository } from '../../repositories/implementation/adminRepository';
import { generateToken, generateRefreshToken } from "../../services";

export class AdminLoginUseCase {
    private adminRepository: AdminRepository;

    constructor() {
        this.adminRepository = new AdminRepository();
    }

    public login(email: string, password: string): { accessToken: string, refreshToken: string } | null {
       
        const adminCredentials = this.adminRepository.getAdminCredentials();

        console.log(adminCredentials,"adminCredentials")

        if (email === adminCredentials.email && password === adminCredentials.password) {
            const accessToken = generateToken(email);
            const refreshToken = generateRefreshToken(email);

            
            return { accessToken, refreshToken };
        }
        return null;
    }
}