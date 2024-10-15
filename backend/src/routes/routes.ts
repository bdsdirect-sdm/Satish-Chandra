import express from 'express';
import { uploadProfileImage, upload } from '../controllers/controllers'; // Adjust the path as needed
import multer from '../routes/uploads';
import { controller } from '../controllers/controllers'

const router = express.Router();



router.post('/register', upload.fields([
    { name: 'profileImage', maxCount: 1 }, // Handle profile photo
    { name: 'resume', maxCount: 1 } // Handle appointment letter
]), controller.register);

// Route for user login
router.get('/jobSeekerslist',)
router.post('/login', controller.login);
// router.get('/agency/:id', controller.getAgencyById);
router.get('/agency/:id', controller.getAgencyById);
router.get('/agencylist', controller.getAgencyList)
router.get('/jobSeekers/:id', controller.getJobSeekerById);

export default router;