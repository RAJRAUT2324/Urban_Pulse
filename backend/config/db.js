import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        mongoose.set('bufferCommands', true); // Re-enable buffering to prevent crashes if connection is slow
        const maskedURI = process.env.MONGO_URI ? process.env.MONGO_URI.replace(/:([^:@]+)@/, ':****@') : 'UNDEFINED';
        console.log(`Attempting to connect to: ${maskedURI}`);

        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
            bufferTimeoutMS: 5000, // Error faster if connection fails
        });
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    } catch (error) {
        throw new Error(`MongoDB Connection Failed: ${error.message}`);
    }
};


export default connectDB;
