import { dbConnection } from './DB/dbConnection.js'
import app from './app.js' 


app.listen(process.env.PORT , ()=>{
    dbConnection(); 
    console.log('Server Chalu Ho Gya');
})
