import { Request, Response, Router } from "express";
import * as Controll from "./controllers/Controllers";
import { unregisterMiddleware } from "../middlewares/unregisterMiddleware";
import verifyAccount from "../middlewares/verifyAccountMiddleware";
import { upload } from "../utils/uploadAWS.util";
const router: Router = Router();
router.get('/', (req: Request, res: Response)=>{
    console.log('usuário novo...');
    res.send("Hello! Welcome to Al-PostEl!");
})
router.post('/login/email', Controll.loginController.postEmail)
router.post('/login', Controll.loginController.postLogin);
router.post('/register', Controll.registerController.postRegister);
router.post('/unregister', unregisterMiddleware, Controll.unregisterController.postUnregister);
router.post('/searchUser', Controll.searchUserController.postSearchUser);
router.post('/addPhoto', verifyAccount, upload.single("imagem"),
Controll.changePhoto.postChangePhoto);
export { router };