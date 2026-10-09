import mongoose from "mongoose";

const ConnectDB = async () => {
    mongoose.connection.on('connected', () => {
        console.log("Connected to database.");
    });

    await mongoose.connect(`${process.env.MONGO_URI}/intermediary_cover`);
};

export default ConnectDB;