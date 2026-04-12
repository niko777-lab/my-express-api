import express from "express";
import itemsRouter from "./routes/items.route.js";

const app = express();

// middleware → allows server to read JSON body from requests
app.use(express.json());

// routes → all /items requests go to itemsRouter
app.use("/items", itemsRouter);

// server → runs on port 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});