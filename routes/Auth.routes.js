import express from 'express'
import  { createUser , logInUser} from '../controller/Auth.controller.js'  

const router = express.Router(); 

router.post('/signup' ,createUser).post('/login' , logInUser);
     


export default router;