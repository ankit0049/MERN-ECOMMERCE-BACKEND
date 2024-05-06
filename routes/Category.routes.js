import express from 'express'
import  {fetchCategories , createCategory} from '../controller/Category.controller.js'  

const router = express.Router(); 

router.get('/' , fetchCategories).post('/',createCategory); 


export default router;