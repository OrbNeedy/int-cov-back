import multer from 'multer';

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './assets/images');
    },
    filename: function(req, file, callback) {
        callback(null, 'intermediary_cover_storage_' + file.originalname);
    }
});

const uploadImage = multer({ storage, fileFilter: function(req, file, callback) {
    const filter = file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || 
        file.mimetype == "image/png" || file.mimetype == "image/gif" || file.mimetype == "image/webp";
    
    return callback(null, filter);
}});

export default uploadImage;