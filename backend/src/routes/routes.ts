import express from 'express';
import { uploadProfileImage } from '../controllers/controllers'; // Adjust the path as needed

import { controller } from '../controllers/controllers'

const router = express.Router();


// Route for user registration with profile image and resume upload
router.post('/register', uploadProfileImage, controller.register);

// Route for user login
router.post('/login', controller.login);

// Route for updating user information with optional profile image upload
router.put('/user/:id', uploadProfileImage, controller.updateUser);

export default router;
