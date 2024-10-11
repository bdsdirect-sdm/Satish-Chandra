import { Request, Response } from 'express';
import User from '../models/Test'; // Adjust the path as needed
import { mailer } from '../mailServices/nodemailer';
import mailTemplates from '../mailTemplates/mailTemplates';
import multer from 'multer';
import path from 'path';

// Configure Multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify the upload directory
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Append the original extension
    },
});

// Initialize Multer
const upload = multer({ storage });
export class controller {
    public static async register(req: Request, res: any): Promise<any> {
        const { firstName, lastName, email, phone, gender, userType, profileImage, resume } = req.body;

        try {
            // Check if user already exists
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            // Create a new user without password
            const newUser = await User.create({
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
                html: mailTemplates(firstName, lastName),
            };

            const transporter = mailer.transporter;

            transporter.sendMail(mailOptions, (error: any) => {
                if (error) {
                    console.error('Error occurred while sending email: ' + error.message);
                }
            });

            return res.status(201).json({ message: 'User created successfully', user: newUser });
        } catch (error) {
            console.error('Registration error: ', error);
            return res.status(500).json({ message: 'Failed to create a user' });
        }
    }

    static async login(req: Request, res: Response): Promise<any> {
        const { email } = req.body;

        try {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            // Optional: Generate a JWT token here for session management

            return res.status(200).json({ message: 'Login successful', user });
        } catch (error) {
            console.error('Login error: ', error);
            return res.status(500).json({ message: 'Failed to log in' });
        }
    }

    static async updateUser(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const { firstName, lastName, email, phone, gender, userType } = req.body;

        try {
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }



            await user.save();

            return res.status(200).json({ message: 'User updated successfully', user });
        } catch (error) {
            console.error('Update error: ', error);
            return res.status(500).json({ message: 'Failed to update user' });
        }
    }
}

// Export the upload middleware for use in routes
export default controller;
export const uploadProfileImage = upload.single('profileImage'); 
