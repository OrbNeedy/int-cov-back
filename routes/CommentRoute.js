import express from 'express';
import { addAdminComment, addComment, deleteComment, getAllComments, getCommentById, getCommentsByPost, updateComment } from '../controllers/CommentController.js';
import validateCredentials from '../middleware/validateCredentials.js';

const commentRouter = express.Router();

commentRouter.post('/', addComment);
commentRouter.post('/admin/', validateCredentials, addAdminComment);
commentRouter.get('/:id', getCommentById);
commentRouter.get('/', getAllComments);
commentRouter.get('/post/:id', getCommentsByPost);
commentRouter.put('/:id', validateCredentials, updateComment);
commentRouter.delete('/:id', validateCredentials, deleteComment);

export default commentRouter;