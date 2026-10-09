import mongoose, { ObjectId } from "mongoose";

const CommentSchema = new mongoose.Schema({
    username: { type: String, required: true }, 
    admin: { type: Boolean, required: true, default: false }, 
    content: { type: String, required: true }, 
    post: { type: ObjectId, ref: 'posts' }, 
    createdAt: { type: Date, required: true, default: Date.now() } // use post.markModified('dateAdded'); before saving 
});

// If model already exists, use it, otherwise, create it (CREATE TABLE IF NOT EXISTS)
const commentModel = mongoose.models.comments || mongoose.model("comments", CommentSchema);

export default commentModel;