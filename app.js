import express from 'express' 
import dotenv from 'dotenv' 
import cors from 'cors'
import  productRouter from './routes/Products.routes.js' 
import categoryRouter from './routes/Category.routes.js'
import brandRouter from './routes/Brands.routes.js'  
import userRouter from './routes/User.routes.js' 
import authRouter from './routes/Auth.routes.js' 
import cartRouter from './routes/Cart.routes.js' 
import orderRouter from './routes/Order.routes.js'

dotenv.config({path : 'config.env'});

const app = express();  
app.use(cors({
    exposedHeaders:['X-Total-Count']
}))
app.use(express.json()); 

app.use('/products' ,productRouter); 
app.use('/brands' ,brandRouter);
app.use('/categories' ,categoryRouter);  
app.use('/users' ,userRouter);
app.use('/auth' ,authRouter);  
app.use('/cart' ,cartRouter); 
app.use('/orders' , orderRouter)

// app.use('/api/v1/products' ,productRouter); 
// app.use('/api/v1/brands' ,brandRouter);
// app.use('/api/v1/categories' ,categoryRouter);  
// app.use('/api/v1/user' ,userRouter);
// app.use('/api/v1/auth' ,authRouter);  
// app.use('/api/v1/cart' ,cartRouter); 
// app.use('/api/v1/order' , orderRouter)
export default app;