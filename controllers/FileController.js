import fileCategoryModel from '../models/FileCategoryModel.js';
import fileModel from '../models/FilesModel.js';

const addFile = async (req, res) => {
    try {
        const newFileData = req.body.newFile;
        const file = req.file;

        const fileData = new fileModel(newFileData);
        fileData.path = file.filename;

        await fileData.save();

        res.status(200).json({ Success: "Request successful.", NewFile: fileData });
    } catch (e) {
        console.log(e);
        res.status(500).json({ Error: "An error occurred while adding a file.", Message: e });
    }
};

const getFile = async (req, res) => {
    try {
        const file = await fileModel.findById(req.params.id);

        res.status(200).json({ Success: "Request successful.", File: file });
    } catch (e) {
        console.log(e);
        res.status(500).json({ Error: "An error occurred while getting a file.", Message: e });
    }
};

const getRawFile = async (req, res) => {
    try {
        const path = req.params.path;

        res.sendFile(path, {root: './assets/files/'});
    } catch (e) {
        console.log(e);
        res.status(500).json({ Error: "An error occurred while getting a file.", Message: e });
    }
};

const getAllFiles = async (req, res) => {
    try {
        const files = await fileModel.find({});

        res.status(200).json({ Success: "Request successful.", Files: files });
    } catch (e) {
        console.log(e);
        res.status(500).json({ Error: "An error occurred while getting files.", Message: e });
    }
};

const updateFile = async (req, res) => {
    try {
        const file = await fileModel.findById(req.params.id);
        const oldFile = file;
        file = req.body.newFile;

        await file.save();
        
        res.status(200).json({ Success: "Request successful.", OldFile: oldFile });
    } catch (e) {
        console.log(e);
        res.status(500).json({ Error: "An error occurred while updating a file.", Message: e });
    }
};

const deleteFile = async (req, res) => {
    try {
        const file = await fileModel.findById(req.params.id);
        const oldFile = file;
        
        await file.deleteOne();

        await fileCategoryModel.updateMany({ files: { $all: [ req.params.id ] } }, {
            $pullAll: {
                files: [ req.params.id ]
            }
        });
        
        res.status(200).json({ Success: "Request successful.", OldFile: oldFile });
    } catch (e) {
        console.log(e);
        res.status(500).json({ Error: "An error occurred while deleting a file.", Message: e });
    }
};

export { addFile, getFile, getRawFile, getAllFiles, updateFile, deleteFile };