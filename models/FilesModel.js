import mongoose from "mongoose";

const FileSchema = new mongoose.Schema({
    name: { type: String, required: true},
    version: { type: String, required: true }, 
    path: { type: String, required: true, unique: true} // Path includes name
}, {});

// If model already exists, use it, otherwise, create it (CREATE TABLE IF NOT EXISTS)
const fileModel = mongoose.models.files || mongoose.model("files", FileSchema);

export default fileModel;