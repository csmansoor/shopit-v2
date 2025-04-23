import express from "express";
const app = express();
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDatabase } from './config/dbConnect.js';
import errorsMiddleware from "./middlewares/errors.js";

// Handle uncaught exceptions
process.on("uncaughtException", (err) =>{
    console.log(`ERROR: ${err}`);
    console.log(`Shutting down server due to uncaught exception`)
    process.exit(1)
});

dotenv.config({ path: "backend/config/config.env" });

// connecting to the database
connectDatabase();

app.use(express.json());
app.use(cookieParser());


// Import all routes
import productRoutes from "./routes/products.js";
import authRoutes from "./routes/auth.js";

app.use("/api/v1", productRoutes);
app.use("/api/v1", authRoutes);

// Using error middleware
app.use(errorsMiddleware);

const server = app.listen(process.env.PORT, () => {
    console.log(
        `Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
    );
});


// handle unhandled promise rejection
process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Promise Rejection:", reason);

    // Gracefully close the server
    server.close(() => {
        console.log("Server closed due to unhandled promise rejection.");
        if (process.env.NODE_ENV === "DEVELOPMENT") {
            console.log("Restarting in development mode...");
        } else {
            process.exit(1); // Only exit in production mode    
        }

    });

});

// Triggering an unhandled promise rejection (for testing)
//setTimeout(() => {
   // Promise.reject(new Error("This is an unhandled promise rejection!"));
//}, 3000);



















