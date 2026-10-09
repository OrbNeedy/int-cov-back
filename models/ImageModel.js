import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true},
    path: { type: String, required: true, unique: true} // Path includes name
}, {});

// If model already exists, use it, otherwise, create it (CREATE TABLE IF NOT EXISTS)
const imageModel = mongoose.models.images || mongoose.model("images", ImageSchema);

export default imageModel;