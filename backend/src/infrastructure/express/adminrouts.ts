import { Router } from "express";
const router = Router();
import { AdminController } from "../../adapters/controllers";





const adminController = new AdminController();

router.get("/admin/users", (req, res) => {
    adminController.getAllUsers(req, res);
});


export default router;