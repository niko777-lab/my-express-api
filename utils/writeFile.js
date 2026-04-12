import { writeFile } from "fs/promises";

// function to write data into JSON file
export async function WriteFile(path, data) {
    // convert JS object → JSON string and save
    await writeFile(path, JSON.stringify(data, null, 2));
}