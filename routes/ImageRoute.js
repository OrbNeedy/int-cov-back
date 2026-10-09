import express from 'express';
import { addImage, deleteImage, getAllImages, getImageById, getRawImage, updateImage } from '../controllers/ImageController.js';
import uploadImage from '../middleware/multerImage.js';
import validateCredentials from '../middleware/validateCredentials.js';

const imageRouter = express.Router();

imageRouter.post('/', validateCredentials, uploadImage.single('image'), addImage);
imageRouter.get('/:id', getImageById);
imageRouter.get('/storage/:path', getRawImage);
imageRouter.get('/', getAllImages);
imageRouter.put('/:id', validateCredentials, uploadImage.single('image'), updateImage);
imageRouter.delete('/:id', validateCredentials, deleteImage);

export default imageRouter;