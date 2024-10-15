import { Request, Response } from 'express';
import User from '../models/Test'; // Adjust the path as needed
import { mailer } from '../mailServices/nodemailer';
import mailTemplates from '../mailTemplates/mailTemplates';
import '../Validations/userValidationSchema';
import multer from 'multer';
import path from 'path';
import '../Middlewares/authMiddlewares';


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
export const upload = multer({ storage });
export class controller {


    public static async register(req: Request, res: any): Promise<any> {

        let { firstName, lastName, email, phone, gender, userType, profileImage, hobbies, resume, selectedAgency } = req.body;
        console.log(req.body)
        if (userType == 'agency') {
            selectedAgency = null;
        }
        const password = "hello@123"

        try {
            // Check if user already exists
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }
            console.log(req.files)
            const files: any = req?.files
            // Create a new user without password
            const newUser = await User.create({
                firstName,
                lastName,
                email,
                phone,
                gender,
                userType,
                hobbies,
                selectedAgency,
                profileImage: files?.profileImage?.[0].path || '',
                resume: files?.resume?.[0].path || '',
            });


            try {
                // Send welcome email
                const mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: email,
                    subject: 'Welcome to our Team',
                    html: mailTemplates(firstName, lastName, password),
                };

                const transporter = mailer.transporter;

                transporter.sendMail(mailOptions, (error: any) => {
                    if (error) {
                        console.error('Error occurred while sending email: ' + error.message);
                    }
                });
            } catch (error) {
                console.log(error, 'error,,,,,,,,,,,,,,,')
            }


            return res.status(201).json({ message: 'User created successfully', user: newUser });
        } catch (error) {
            console.error('Registration error: ', error);
            return res.status(500).json({ message: 'Failed to create a user' });
        }
    }

    //login a user
    static async login(req: Request, res: Response): Promise<any> {
        const { email } = req.body;

        try {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }



            return res.status(200).json({ message: 'Login successful', user, success: true });
        } catch (error) {
            console.error('Login error: ', error);
            return res.status(500).json({ message: 'Failed to log in' });
        }
    }

    // static async updateUser(req: Request, res: Response): Promise<any> {
    //     const { id } = req.params;
    //     const { firstName, lastName, email, phone, gender, userType } = req.body;

    //     try {
    //         const user = await User.findByPk(id);
    //         if (!user) {
    //             return res.status(404).json({ message: 'User not found' });
    //         }



    //         await user.save();

    //         return res.status(200).json({ message: 'User updated successfully', user });
    //     } catch (error) {
    //         console.error('Update error: ', error);
    //         return res.status(500).json({ message: 'Failed to update user' });
    //     }
    // }


    // router.get('/users/:type/:id', controller.getUserById);

    // router.get('/users/:id', controller.getUserById);


    public static async getAgencyId(req: Request, res: Response): Promise<any> {
        const { id } = req.params;

        try {
            // Fetch the user by ID
            const user = await User.findOne({ where: { id } });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Check the user type
            if (user.userType === 'jobSeeker') {
                return res.status(200).json({ ...user, type: 'jobSeeker' });
            } else if (user.userType === 'agency') {
                return res.status(200).json({ ...user, type: 'agency' });
            } else {
                return res.status(400).json({ message: 'Invalid user type' });
            }
        } catch (error) {
            console.error('Error fetching user: ', error);
            return res.status(500).json({ message: 'Failed to retrieve user' });
        }
    }

    public static async getAgency(req: Request, res: Response): Promise<any> {
        const { id } = req.params;

        try {
            // Fetch the user by ID
            const user = await User.findOne({ where: { id } });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }


            if (user.userType === 'jobSeeker') {
                return res.status(200).json({ ...user, type: 'jobSeeker' });
            } else if (user.userType === 'agency') {
                return res.status(200).json({ ...user, type: 'agency' });
            } else {
                return res.status(400).json({ message: 'Invalid user type' });
            }
        } catch (error) {
            console.error('Error fetching user: ', error);
            return res.status(500).json({ message: 'Failed to retrieve user' });
        }
    }



    //controller to get an agency list
    public static async getAgencyList(req: Request, res: Response): Promise<any> {
        const { agencylist } = req.params;

        try {

            const user = await User.findAll({ where: { userType: 'agency' } });

            if (!user) {
                return res.status(404).json({ message: 'agency not found' });
            }


        } catch (error) {
            console.error('Error fetching Lists: ', error);
            return res.status(500).json({ message: 'Failed to retrieve Agency lists' });
        }
    }




    //getting a jobSeeker by id
    public static async getJobSeekerById(req: Request, res: Response): Promise<any> {
        const { id } = req.params;

        try {
            const jobSeeker = await User.findOne({ where: { id, userType: 'jobSeeker' } });
            if (!jobSeeker) {
                return res.status(404).json({ message: 'Job seeker not found' });
            }
            return res.status(200).json(jobSeeker);
        } catch (error) {
            console.error('Error fetching job seeker: ', error);
            return res.status(500).json({ message: 'Failed to retrieve job seeker' });
        }
    }

    //get jobseekers////////////



    //get the agency by id
    public static async getAgencyById(req: Request, res: Response): Promise<any> {
        const { id } = req.params;

        try {
            const agency = await User.findOne({ where: { id, userType: 'agency' } });
            if (!agency) {
                return res.status(404).json({ message: 'Agency not found' });
            }

            const usersList: any = await User.findAll({ where: { userType: "jobSeeker" } })

            return res.status(200).json(usersList);
        } catch (error) {
            console.error('Error fetching agency: ', error);
            return res.status(500).json({ message: 'Failed to retrieve agency' });
        }
    }
}


export default controller;
export const uploadProfileImage = upload.single('profileImage'); 
