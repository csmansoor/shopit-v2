import mongoose from "mongoose";

export const connectDatabase = () => {
    const DB_URI = process.env.DB_URI || process.env.DB_LOCAL_URI;

    if (!DB_URI) {
        console.error("Database connection string is missing!");
        process.exit(1);
    }

    mongoose.connect(DB_URI)
        .then((con) => {
            console.log(`MongoDB Database connected with HOST: ${con?.connection?.host}`);
        })
        .catch((err) => {
            console.error("MongoDB Connection Error:", err);
            process.exit(1);
        });
};
