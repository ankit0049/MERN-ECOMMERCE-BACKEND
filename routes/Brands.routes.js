import express from 'express'
import  {createBrand , fetchBrands} from '../controller/Brands.controller.js'  

const router = express.Router(); 

router.get('/' , fetchBrands).post('/' ,createBrand); 


export default router;