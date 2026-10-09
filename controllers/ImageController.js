import categoryModel from "../models/CategoryModel.js";
import imageModel from "../models/ImageModel.js";
import { unlink } from 'node:fs';

const addImage = async (req, res) => {
    try {
        const title = req.body.title;
        const imageFile = req.file;

        const image = new imageModel({ title: title, path: imageFile.filename });

        await image.save();

        res.status(200).json({ Success: "Request successful.", NewImage: image });
    } catch (e) {
        console.log(e);
        res.status(500).json({ Error: "An error occurred while adding an image.", Message: e });
    }
};

const getImageById = async (req, res) => {
    try {
        const image = await imageModel.findById(req.params.id);

        res.status(200).json({ Success: "Request successful.", Image: image });
    } catch (e) {
        console.log(e);
        res.status(500).json({ Error: "An error occurred while getting an image.", Message: e });
    }
};

const getRawImage = async (req, res) => {
    try {
        const path = req.params.path;

        res.sendFile(path, {root: './assets/images/'});
    } catch (e) {
        console.log(e);
        res.status(500).json({ Error: "An error occurred while getting image file.", Message: e });
    }
};

const getAllImages = async (req, res) => {
    try {
        const images = await imageModel.find({});

        res.status(200).json({ Success: "Request successful.", Images: images });
    } catch (e) {
        console.log(e);
        res.status(500).json({ Error: "An error occurred while getting images.", Message: e });
    }
};

const updateImage = async (req, res) => {
    try {
        const image = await imageModel.findById(req.params.id);
        const oldImage = image;
        image = req.body.newImage;

        image.path = req.file.filename;
        image.save();

        res.status(200).json({ Success: "Request successful.", OldImage: oldImage });
    } catch (e) {
        console.log(e);
        res.status(500).json({ Error: "An error occurred while updating an image.", Message: e });
    }
};

const deleteImage = async (req, res) => {
    try {
        const image = await imageModel.findById(req.params.id);
        const oldImage = image;
        
        unlink('./assets/images/' + image.path, (err) => {
            if (err) throw err;
            
            console.log("Image at " + './assets/images/' + image.path + " deleted.");
        });

        await image.deleteOne();
        
        await categoryModel.updateMany({ images: { $all: [ req.params.id ] } }, {
            $pullAll: {
                images: [ req.params.id ]
            }
        });

        res.status(200).json({ Success: "Request successful.", OldImage: oldImage });
    } catch (e) {
        console.log(e);
        res.status(500).json({ Error: "An error occurred while deleting an image.", Message: e });
    }
};

export { addImage, getImageById, getRawImage, getAllImages, updateImage, deleteImage };