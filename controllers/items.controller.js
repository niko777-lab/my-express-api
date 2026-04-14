import { ReadFile } from "../utils/readFile.js";
import { WriteFile } from "../utils/writeFile.js";

// path to our JSON database
const DB = "./data/items.json";

// GET ALL ITEMS
export const getItems = async (req, res) => {
    try {
        const items = await ReadFile(DB); // read all data
        res.json(items); // send response
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// GET ITEM BY ID
export const getItemById = async (req, res) => {
    try {
        const id = Number(req.params.id); // get id from URL

        // check if id is valid number
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        const items = await ReadFile(DB);

        // find item with matching id
        const item = items.find(i => i.id === id);

        // if not found  404 error
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.json(item);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// CREATE NEW ITEM
export const createItem = async (req, res) => {
    try {
        const { name, category, description, rating } = req.body;

        // validation → check required fields
        if (!name || !category || !description || rating === undefined) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // check rating type
        if (typeof rating !== "number") {
            return res.status(400).json({ message: "Rating must be a number" });
        }

        const items = await ReadFile(DB);

        // create new object
        const newItem = {
            id: Date.now(), // unique id
            name,
            category,
            description,
            rating,
            createdAt: new Date()
        };

        items.push(newItem); // add to array

        await WriteFile(DB, items); // save to file

        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// UPDATE ITEM
export const updateItem = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        const items = await ReadFile(DB);

        // find index of item
        const index = items.findIndex(i => i.id === id);

        if (index === -1) {
            return res.status(404).json({ message: "Item not found" });
        }

        // update item ( old + new data)
        items[index] = { ...items[index], ...req.body };

        await WriteFile(DB, items);

        res.json(items[index]);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// DELETE ITEM
export const deleteItem = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        const items = await ReadFile(DB);

        // remove item from array
        const filtered = items.filter(i => i.id !== id);

        // if nothing removed  not found
        if (filtered.length === items.length) {
            return res.status(404).json({ message: "Item not found" });
        }

        await WriteFile(DB, filtered);

        res.json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};