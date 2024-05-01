import express from 'express'
import  {createCategory, fetchCategory} from '../controller/Category.controller.js'  

const router = express.Router(); 

router.get('/' , fetchCategory).post('/',createCategory); 


export default router;