"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const uploads = express_1.default.Router();
// Configure storage options
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify the upload folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path_1.default.extname(file.originalname)); // Unique filename
    }
});
// Initialize multer with the storage configuration
const upload = (0, multer_1.default)({
    storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|pdf/; // Allowed file types
        const extname = filetypes.test(path_1.default.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (extname && mimetype) {
            return cb(null, true);
        }
        else {
            cb(new Error('Error: File type not supported!'));
        }
    }
});
// Route for handling user form submission and file uploads
uploads.post('/uploads', upload.fields([
    { name: 'profilePhoto', maxCount: 1 }, // Handle profile photo
    { name: 'appointmentLetter', maxCount: 1 } // Handle appointment letter
]), (req, res) => {
    console.log(req.files, ' ....req.files');
    if (req.files) {
        const profilePhoto = req.files['profilePhoto'] ? req.files['profilePhoto'][0] : null;
        const appointmentLetter = req.files['appointmentLetter'] ? req.files['appointmentLetter'][0] : null;
        // Here you can access other form fields from req.body
        const { firstName, lastName, email, password } = req.body;
        // You can now save the user information along with the uploaded files in your database
        res.json({
            message: 'Files uploaded successfully',
            profilePhoto,
            appointmentLetter,
            Test: {
                firstName,
                lastName,
                email,
                password,
            }
        });
    }
    else {
        res.status(400).json({ message: 'No files uploaded' });
    }
});
exports.default = uploads;
