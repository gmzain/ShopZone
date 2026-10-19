import mongoose from "mongoose";

export const connectDB = async()=>{
   await mongoose.connect(process.env.DATABASE_URL)
    console.log(`server running on host: ${mongoose.connection.host}`)
}   