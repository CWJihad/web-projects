import mongoose from 'mongoose'
import { MONGO_URI } from './config.js'

async function connectDB() {
    try {
    await mongoose.connect(MONGO_URI)
    console.log('✅ connected to DB');    
    } catch (error) {
        console.error('❌ DB connection error: ', error);
    }
    
}

export default connectDB


