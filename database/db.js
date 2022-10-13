import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()
const MongoConnection = async () => {
    await mongoose.connect(process.env.MONGOURL).then(()=>{
        console.log("Database Connected")
    }).catch(err=>{
        console.log("Error Occured While Connecting")
    })
}
export default MongoConnection