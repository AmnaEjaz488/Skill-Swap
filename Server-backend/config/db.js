
import mongoose from'mongoose';
import dotenv from 'dotenv' 
dotenv.config();
console.log(process.env.MONGODB_URI)
>>>>>>> 5ecb0e666b5738eaacf13f2447564a3f3ca59dea

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

export default connectDB;