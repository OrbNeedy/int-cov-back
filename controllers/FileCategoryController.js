import fileCategoryModel from "../models/FileCategoryModel.js";

const addFileCategory = async (req, res) => {
    try {
        const category = req.body.newCategory;

        const newCategory = new fileCategoryModel(category);
        await newCategory.save();

        res.status(200).json({ Success: "Request successful.", NewCategory: newCategory });
    } catch (e) {
        console.log(e);
        res.status(500).json({ Error: "An error occurred when adding a file category.", Message: e });
    }
};

const getFileCategory = async (req, res) => {
    try {
        const category = await fileCategoryModel.findById(req.params.id);

        res.status(200).json({ Success: "Request successful.", Category: category });
    } catch (e) {
        console.log(e);
        res.status(500).json({ Error: "An error occurred when getting a file category.", Message: e });
    }
};

const getAllFileCategories = async (req, res) => {
    try {
        const categories = await fileCategoryModel.find({});

        res.status(200).json({ Success: "Request successful.", Categories: categories });
    } catch (e) {
        console.log(e);
        res.status(500).json({ Error: "An error occurred when getting file categories.", Message: e });
    }
};

const updateFileCategory = async (req, res) => {
    try {
        const category = await fileCategoryModel.findById(req.params.id);
        const oldCategory = category;
        category = req.body.newCategory;

        await category.save();

        res.status(200).json({ Success: "Request successful.", OldCategory: oldCategory });
    } catch (e) {
        console.log(e);
        res.status(500).json({ Error: "An error occurred when updating a file category.", Message: e });
    }
};

const deleteFileCategory = async (req, res) => {
    try {
        const category = await fileCategoryModel.findById(req.params.id);
        const oldCategory = category;

        await category.deleteOne();

        res.status(200).json({ Success: "Request successful.", OldCategory: oldCategory });
    } catch (e) {
        console.log(e);
        res.status(500).json({ Error: "An error occurred when deleting a file category.", Message: e });
    }
};

export { addFileCategory, getFileCategory, getAllFileCategories, updateFileCategory, deleteFileCategory };