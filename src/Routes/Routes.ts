import { Request, Response, Router } from "express";
import * as Controll from "./Controllers/Controllers"

const router: Router = Router();

router.get('/', (req: Request, res: Response)=>{
    console.log('usuário novo...')
    res.send("Hello! Welcome to Al-PostEl!")
})

router.post('/login', Controll.loginCollection.postLogin)
router.post('/register', Controll.registerCollection.postRegister)
router.post('/unregister', Controll.unregisterCollection.postUnregister)

export { router };