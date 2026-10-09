import mongoose, { ObjectId } from "mongoose";

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true }, 
    content: { type: String, required: true }, 
    summary: { type: String, required: true }, 
    featured: { type: Boolean, required: true, default: false }, 
    createdAt: { type: Date, required: true, default: Date.now() } // use post.markModified('dateAdded'); before saving 
});

// If model already exists, use it, otherwise, create it (CREATE TABLE IF NOT EXISTS)
const postModel = mongoose.models.posts || mongoose.model("posts", PostSchema);

export default postModel;