import mongoose, { ObjectId } from "mongoose";

const CategorySchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true},
    images: [{ type: ObjectId, ref: 'images' }] 
}, {});

// If model already exists, use it, otherwise, create it (CREATE TABLE IF NOT EXISTS)
const categoryModel = mongoose.models.category || mongoose.model("category", CategorySchema);

export default categoryModel;