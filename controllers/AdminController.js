import adminModel from "../models/AdminModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const adminSignIn = async (req, res) => {
    try {
        const targetAdmin = req.body.user;
        const newAdmin = new adminModel();


        newAdmin.name = targetAdmin.name;
        newAdmin.password1 = await bcrypt.hash(targetAdmin.password1, 14);
        newAdmin.password2 = await bcrypt.hash(targetAdmin.password2, 14);
        
        await newAdmin.save();

        const access = jwt.sign({ name: targetAdmin.name }, process.env.SECRET);

        res.status(200).json({ Success: "Request successful.", User: newAdmin.name, Access: access })
    } catch (e) {
        console.log(e);
        res.status(500).json({ Error: "An error occurred while making a new admin.", Message: e });
    }
};

const adminLogIn = async (req, res) => {
    try {
        const targetAdmin = req.body.user;
        const admin = await adminModel.findOne({ name: targetAdmin.name });

        if (!admin) {
            return res.status(401).json({ Error: "Authentication failed." })
        }

        const comparison1 = await bcrypt.compare(targetAdmin.password1, admin.password1);
        const comparison2 = await bcrypt.compare(targetAdmin.password2, admin.password2);

        if (!comparison1 || !comparison2) {
            return res.status(401).json({ Error: "Authentication failed." })
        }

        const access = jwt.sign({ name: targetAdmin.name }, process.env.SECRET);
        
        return res.status(200).json({ Success: "Request successful.", User: targetAdmin.name, Access: access })
    } catch (e) {
        console.log(e);
        return res.status(500).json({ Error: "An error occurred while getting an admin.", Message: e });
    }
};

export { adminSignIn, adminLogIn };