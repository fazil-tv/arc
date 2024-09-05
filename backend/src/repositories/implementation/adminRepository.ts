
import { AdminCredentials } from "../../entities";

export class AdminRepository {
    getAdminCredentials(): AdminCredentials {
        const email = process.env.ADMIN_EMAIL || ''; 
        const password = process.env.ADMIN_PASSWORD || '';
        return new AdminCredentials(email, password);
    }
}
