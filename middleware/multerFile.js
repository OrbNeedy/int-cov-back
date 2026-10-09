import multer from 'multer';

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './assets/files');
    },
    filename: function(req, file, callback) {
        callback(null, 'download_' + Date.now() + file.originalname); // Allows same name as they will have different dates 
    }
});

const uploadFile = multer({ storage });

export default uploadFile;