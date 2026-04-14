import express from "express";
import dotenv from "dotenv";
import itemsRouter from "./routes/items.route.js";


dotenv.config();

const app = express();

// middleware
app.use(express.json());

// routes
app.use("/items", itemsRouter);

// use PORT from .env
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});