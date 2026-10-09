import express from 'express';
import { addFile, deleteFile, getAllFiles, getFile, getRawFile, updateFile } from '../controllers/FileController.js';
import uploadFile from '../middleware/multerFile.js';
import validateCredentials from '../middleware/validateCredentials.js';

const fileRouter = express.Router();

fileRouter.post('/', validateCredentials, uploadFile.single('file'), addFile);
fileRouter.get('/:id', getFile)
fileRouter.get('/storage/:path', getRawFile);
fileRouter.get('/', getAllFiles);
fileRouter.put('/:id', validateCredentials, updateFile);
fileRouter.delete('/:id', validateCredentials, deleteFile);

export default fileRouter;