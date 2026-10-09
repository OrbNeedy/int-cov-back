import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import ConnectDB from './config/mongodb.js';
import postRouter from './routes/PostRoute.js';
import commentRouter from './routes/CommentRoute.js';
import imageRouter from './routes/ImageRoute.js';
import fileRouter from './routes/FileRouter.js';
import imageCategoryRouter from './routes/ImageCategoryRoute.js';
import fileCategoryRouter from './routes/FileCategoryRoute.js';
import adminRouter from './routes/AdminRoute.js';

// We regect Cloudinary
// Store images in our own database 
const app = express();
const port = process.env.PORT || 5000;
ConnectDB();

app.use(express.json());
const frontCors = cors({ 
    origin: [process.env.ADMIN_URL, process.env.FRONT_URL, ] || ['http://localhost:3000', 'http://localhost:3001'] 
});
const adminCors = cors({ origin: process.env.ADMIN_URL || 'http://localhost:3001' })

app.use('/posts', frontCors, postRouter);
app.use('/comments', frontCors, commentRouter);
app.use('/images', frontCors, imageRouter);
app.use('/files', frontCors, fileRouter);
app.use('/image_categories', frontCors, imageCategoryRouter);
app.use('/file_categories', frontCors, fileCategoryRouter);
app.use('/admin', adminCors, adminRouter); // Change later when in production

app.get('/', (req, res) => {
    res.status(200).json({ "Success": "App running" });
});

app.listen(port, () => {
    console.log('Server started on port', port);
});