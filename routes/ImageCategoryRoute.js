import express from 'express';
import { addCategory, deleteCategory, getAllCategories, getCategory, updateCategory } from '../controllers/CategoryController.js';
import validateCredentials from '../middleware/validateCredentials.js';

const imageCategoryRouter = express.Router();

imageCategoryRouter.post('/', validateCredentials, addCategory);
imageCategoryRouter.get('/:id', getCategory);
imageCategoryRouter.get('/', getAllCategories);
imageCategoryRouter.put('/:id', validateCredentials, updateCategory);
imageCategoryRouter.delete('/:id', validateCredentials, deleteCategory);

export default imageCategoryRouter;