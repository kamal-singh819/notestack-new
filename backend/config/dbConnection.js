import mongoose from "mongoose";
const dbConnection = async(URL) => {
    try {
        console.log('URL is', URL);
        await mongoose.connect(URL);
        console.log('DB CONNECTED');
        // mongoose.connection.once('open', () => {
        //     console.log('Connection to MongoDB is open');
        // });
        // mongoose.connection.on('error', (error) => {
        //     console.error('mongodb connection error:', error);
        //     mongoose.connection.close();
        //     process.exit(1);
        // });
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1);
    }
}
export default dbConnection;