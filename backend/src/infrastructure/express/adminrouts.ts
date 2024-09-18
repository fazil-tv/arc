import { Router } from "express";
import { upload } from "../../middleware/multerMiddleware";
const router = Router();
import { AdminController } from "../../adapters/controllers";
import { ServiceController } from "../../adapters/controllers";



const adminController = new AdminController();
const serviceController = new ServiceController();

router.get("/admin/users", (req, res) => {
    
    adminController.getAllUsers(req, res);
});

router.post("/admin/addservice",upload,(req, res) => {
   
    serviceController.addService(req, res);


});


export default router;