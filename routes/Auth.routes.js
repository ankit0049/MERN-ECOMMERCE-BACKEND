import express from 'express'
import  { checkUser, createUser , logInUser} from '../controller/Auth.controller.js'  
import passport from 'passport';
const router = express.Router(); 

router
.post('/signup' ,createUser)
.post('/login', passport.authenticate('local') , logInUser)
.get('/check', passport.authenticate('jwt') ,checkUser);
     


export default router;