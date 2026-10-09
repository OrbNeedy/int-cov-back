import jwt from "jsonwebtoken";

const validateCredentials = (req, res, next) => {
    const access = req.header('AdminEntry');

    if (!access) {
        return res.status(401).json({ Error: "Entry restricted." });
    }

    try {
        // Word salad
        const validate = jwt.verify(access, process.env.SECRET);
        if (validate) {
            return next();
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({ Error: "An error happened while validating credentials.", Message: e });
    }
};

export default validateCredentials;