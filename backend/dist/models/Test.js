"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database")); // Adjust according to your project structure
// Define the Test model without using a class
const Test = database_1.default.define('Test', {
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true, // Validates that the value is an email format
        },
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /^\d+$/, // Regex to ensure only digits
        },
    },
    gender: {
        type: sequelize_1.DataTypes.ENUM('male', 'female', 'other'),
        allowNull: false,
    },
    userType: {
        type: sequelize_1.DataTypes.ENUM('jobSeeker', 'agency'),
        allowNull: false,
    },
    hobbies: {
        type: sequelize_1.DataTypes.JSON, // Store hobbies as an array
        allowNull: true,
    },
    profileImage: {
        type: sequelize_1.DataTypes.STRING, // Store path to the image
        allowNull: true,
    },
    resume: {
        type: sequelize_1.DataTypes.STRING, // Store path to the resume file
        allowNull: true,
    },
    selectedAgency: {
        type: sequelize_1.DataTypes.STRING, // Assuming this holds the agency name or ID
        allowNull: true,
    },
}, {
    tableName: 'Test', // Table name in the database
    timestamps: true, // Automatically manage createdAt and updatedAt fields
});
exports.default = Test;
