import { readFile } from "fs/promises";

// function to read JSON file
export async function ReadFile(path) {
    // read file as text
    const data = await readFile(path, "utf-8");

    // convert JSON string  JS object
    return JSON.parse(data || "[]");
}