import express from 'express';
import { addFileCategory, deleteFileCategory, getAllFileCategories, getFileCategory, updateFileCategory } from '../controllers/FileCategoryController.js';
import validateCredentials from '../middleware/validateCredentials.js';

const fileCategoryRouter = express.Router();

fileCategoryRouter.post('/', validateCredentials, addFileCategory);
fileCategoryRouter.get('/:id', getFileCategory);
fileCategoryRouter.get('/', getAllFileCategories);
fileCategoryRouter.put('/:id', validateCredentials, updateFileCategory);
fileCategoryRouter.delete('/:id', validateCredentials, deleteFileCategory);

export default fileCategoryRouter;