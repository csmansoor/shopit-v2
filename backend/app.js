import express from "express";
const app = express();
import dotenv from "dotenv";
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



// Import all routes
import productRoutes from "./routes/products.js";
app.use("/api/v1", productRoutes);

// Using error middleware
app.use(errorsMiddleware);

const server = app.listen(process.env.PORT, () => {
    console.log(
        `Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
    );
});


// handle unhandled promise rejection
process.on("unhandledRejection", (err) => {
    console.log(`ERROR: ${err}`);
    console.log("Shutting down server");
    process.exit(1)
});



















