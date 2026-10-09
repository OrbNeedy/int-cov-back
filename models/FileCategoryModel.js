import mongoose, { ObjectId } from "mongoose";

const FileCategorySchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true},
    files: [{ type: ObjectId, ref: 'files' }] 
}, {});

// If model already exists, use it, otherwise, create it (CREATE TABLE IF NOT EXISTS)
const fileCategoryModel = mongoose.models.fileCategory || mongoose.model("fileCategory", FileCategorySchema);

export default fileCategoryModel;