import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true  }, 
    password1: { type: String, required: true }, 
    password2: { type: String, required: true }
});

const adminModel = mongoose.models.admins || mongoose.model("admins", AdminSchema);

export default adminModel;