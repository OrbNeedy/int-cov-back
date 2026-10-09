import express from 'express';
import { addPost, deletePost, getAllPosts, getPostById, getTop, updatePost } from '../controllers/PostController.js';
import validateCredentials from '../middleware/validateCredentials.js';

const postRouter = express.Router();

postRouter.post('/', validateCredentials, addPost);
postRouter.get('/:id', getPostById);
postRouter.get('/', getAllPosts);
postRouter.get('/top/posts', getTop);
postRouter.put('/:id', validateCredentials, updatePost);
postRouter.delete('/:id', validateCredentials, deletePost);

export default postRouter;