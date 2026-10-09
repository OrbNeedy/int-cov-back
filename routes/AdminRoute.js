import express from 'express';
import { adminLogIn, adminSignIn } from '../controllers/AdminController.js';

const adminRouter = express.Router();

adminRouter.post('/signIn', adminSignIn);
adminRouter.post('/logIn', adminLogIn);

export default adminRouter;