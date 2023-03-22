const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const MONGO_URI = process.env.MONGO_PRODUCTION
mongoose.set('strictQuery',false)
const connectToDb = async ()=>{
    try{
        const connection = await mongoose.connect(MONGO_URI,{
            useUnifiedTopology:true,
            useNewUrlParser:true,
            dbName:'storeyako'
        })
        if(connection){
            console.log('connected to store database')
        }else{
            console.log('something went wrong')
        }
    }catch(error){
        console.error(`Error is ${error.message}`);
        process.exit(1)
    }
}

module.exports = connectToDb