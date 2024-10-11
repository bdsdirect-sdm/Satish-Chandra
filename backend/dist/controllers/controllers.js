"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadProfileImage = exports.controller = void 0;
const Test_1 = __importDefault(require("../models/Test")); // Adjust the path as needed
const nodemailer_1 = require("../mailServices/nodemailer");
const mailTemplates_1 = __importDefault(require("../mailTemplates/mailTemplates"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// Configure Multer for file storage
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify the upload directory
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path_1.default.extname(file.originalname)); // Append the original extension
    },
});
// Initialize Multer
const upload = (0, multer_1.default)({ storage });
class controller {
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstName, lastName, email, phone, gender, userType, profileImage, resume } = req.body;
            try {
                // Check if user already exists
                const existingUser = yield Test_1.default.findOne({ where: { email } });
                if (existingUser) {
                    return res.status(400).json({ message: 'User already exists' });
                }
                // Create a new user without password
                const newUser = yield Test_1.default.create({
                    firstName,
                    lastName,
                    email,
                    phone,
                    gender,
                    userType,
                    profileImage: req.file ? req.file.path : '',
                    resume: req.file ? req.file.path : ''
                });
                // Send welcome email
                const mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: email,
                    subject: 'Welcome to our Team',
                    html: (0, mailTemplates_1.default)(firstName, lastName),
                };
                const transporter = nodemailer_1.mailer.transporter;
                transporter.sendMail(mailOptions, (error) => {
                    if (error) {
                        console.error('Error occurred while sending email: ' + error.message);
                    }
                });
                return res.status(201).json({ message: 'User created successfully', user: newUser });
            }
            catch (error) {
                console.error('Registration error: ', error);
                return res.status(500).json({ message: 'Failed to create a user' });
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            try {
                const user = yield Test_1.default.findOne({ where: { email } });
                if (!user) {
                    return res.status(400).json({ message: 'Invalid credentials' });
                }
                // Optional: Generate a JWT token here for session management
                return res.status(200).json({ message: 'Login successful', user });
            }
            catch (error) {
                console.error('Login error: ', error);
                return res.status(500).json({ message: 'Failed to log in' });
            }
        });
    }
    static updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { firstName, lastName, email, phone, gender, userType } = req.body;
            try {
                const user = yield Test_1.default.findByPk(id);
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
                yield user.save();
                return res.status(200).json({ message: 'User updated successfully', user });
            }
            catch (error) {
                console.error('Update error: ', error);
                return res.status(500).json({ message: 'Failed to update user' });
            }
        });
    }
}
exports.controller = controller;
// Export the upload middleware for use in routes
exports.default = controller;
exports.uploadProfileImage = upload.single('profileImage');
