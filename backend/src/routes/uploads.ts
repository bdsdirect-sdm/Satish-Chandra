import express from 'express';
import multer from 'multer';
import path from 'path';
import cors from 'cors';

const uploads = express.Router();

// Configure storage options

const storage = multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
        cb(null, 'uploads/'); // Specify the upload folder
    },
    filename: (req: any, file: any, cb: any) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

// Initialize multer with the storage configuration
const upload = multer({
    storage,
    fileFilter: (req: any, file: any, cb: any) => {
        const filetypes = /jpeg|jpg|png|pdf/; // Allowed file types
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Error: File type not supported!'));
        }
    }
});

// Route for handling user form submission and file uploads
uploads.post('/uploads', upload.fields([
    { name: 'profileImage', maxCount: 1 }, // Handle profile photo
    { name: 'resume', maxCount: 1 } // Handle appointment letter
]), (req: any, res: any) => {
    console.log(req.files, ' ....req.files')
    if (req.files) {
        const profileImage = req.files['profileImage'] ? req.files['profileImage'][0] : null;
        const resume = req.files['resume'] ? req.files['resume'][0] : null;

        // Here you can access other form fields from req.body
        const { firstName, lastName, email, password } = req.body;

        // You can now save the user information along with the uploaded files in your database

        res.json({
            message: 'Files uploaded successfully',
            profileImage,
            resume,

        });
    } else {
        res.status(400).json({ message: 'No files uploaded' });
    }
});

export default uploads;
