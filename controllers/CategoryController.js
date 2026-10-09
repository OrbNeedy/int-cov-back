import categoryModel from "../models/CategoryModel.js";

const addCategory = async (req, res) => {
    try {
        const category = req.body.newCategory;

        const newCategory = new categoryModel(category);
        await newCategory.save();

        res.status(200).json({ Success: "Request successful.", NewCategory: newCategory });
    } catch (e) {
        console.log(e);
        res.status(500).json({ Error: "An error occurred when adding a category.", Message: e });
    }
};

const getCategory = async (req, res) => {
    try {
        const category = await categoryModel.findById(req.params.id);

        res.status(200).json({ Success: "Request successful.", Category: category });
    } catch (e) {
        console.log(e);
        res.status(500).json({ Error: "An error occurred when getting a category.", Message: e });
    }
};

const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryModel.find({});

        res.status(200).json({ Success: "Request successful.", Categories: categories });
    } catch (e) {
        console.log(e);
        res.status(500).json({ Error: "An error occurred when getting categories.", Message: e });
    }
};

const updateCategory = async (req, res) => {
    try {
        const category = await categoryModel.findById(req.params.id);
        const oldCategory = category;
        category = req.body.newCategory;

        await category.save();

        res.status(200).json({ Success: "Request successful.", OldCategory: oldCategory });
    } catch (e) {
        console.log(e);
        res.status(500).json({ Error: "An error occurred when updating a category.", Message: e });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const category = await categoryModel.findById(req.params.id);

        await category.deleteOne();

        res.status(200).json({ Success: "Request successful.", OldCategory: category });
    } catch (e) {
        console.log(e);
        res.status(500).json({ Error: "An error occurred when deleting a category.", Message: e });
    }
};

export { addCategory, getCategory, getAllCategories, updateCategory, deleteCategory };