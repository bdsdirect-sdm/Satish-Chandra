"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers/controllers"); // Adjust the path as needed
const controllers_2 = require("../controllers/controllers");
const router = express_1.default.Router();
// Route for user registration with profile image and resume upload
router.post('/register', controllers_1.uploadProfileImage, controllers_2.controller.register);
// Route for user login
router.post('/login', controllers_2.controller.login);
// Route for updating user information with optional profile image upload
router.put('/user/:id', controllers_1.uploadProfileImage, controllers_2.controller.updateUser);
exports.default = router;
