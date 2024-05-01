import express from 'express'
import  {createBrands, fetchBrands} from '../controller/Brands.controller.js'  

const router = express.Router(); 

router.get('/' , fetchBrands).post('/' ,createBrands); 


export default router;