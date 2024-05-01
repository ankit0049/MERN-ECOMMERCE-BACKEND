import {Brand} from '../model/Brands.model.js'

export const fetchBrands = async (req , res)=>{
    try { 
        const brands = await Brand.find({}).exec();
        res.status(201).json(brands);
    } catch (error) {
        res.status(401).json({error : error});
    }
}

export const createBrands = async (req, res) => {
    const brand = new Brand(req.body);
  
    try {
      const doc = await brand.save();
      res.status(201).json(doc); 
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(400).json({ error}); 
    }
  };