import express from "express";
import {
    getItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem
} from "../controllers/items.controller.js";

const router = express.Router();

// GET all items
router.get("/", getItems);

// GET item by id
router.get("/:id", getItemById);

// CREATE item
router.post("/", createItem);

// UPDATE item
router.put("/:id", updateItem);

// DELETE item
router.delete("/:id", deleteItem);

export default router;