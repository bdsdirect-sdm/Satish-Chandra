import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database'; // Adjust according to your project structure

// Define the attributes for the User model
interface UserAttributes {
    id?: number; // Assuming you have an auto-incrementing ID
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    gender: 'male' | 'female' | 'other';
    userType: 'jobSeeker' | 'agency';
    hobbies?: string[]; // Array of strings
    profileImage?: string; // Path to the image
    resume?: string; // Path to the resume file
    selectedAgency?: string; // Selected agency
    createdAt?: Date; // Timestamp
    updatedAt?: Date; // Timestamp
}

// Define optional attributes for creation
interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'hobbies' | 'profileImage' | 'resume' | 'selectedAgency' | 'createdAt' | 'updatedAt'> { }

// Define the Test model without using a class
const Test = sequelize.define<Model<UserAttributes, UserCreationAttributes>>('Test', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true, // Validates that the value is an email format
        },
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /^\d+$/, // Regex to ensure only digits
        },
    },
    gender: {
        type: DataTypes.ENUM('male', 'female', 'other'),
        allowNull: false,
    },
    userType: {
        type: DataTypes.ENUM('jobSeeker', 'agency'),
        allowNull: false,
    },
    hobbies: {
        type: DataTypes.JSON, // Store hobbies as an array
        allowNull: true,
    },
    profileImage: {
        type: DataTypes.STRING, // Store path to the image
        allowNull: true,
    },
    resume: {
        type: DataTypes.STRING, // Store path to the resume file
        allowNull: true,
    },
    selectedAgency: {
        type: DataTypes.STRING, // Assuming this holds the agency name or ID
        allowNull: true,
    },
}, {
    tableName: 'Test', // Table name in the database
    timestamps: true,  // Automatically manage createdAt and updatedAt fields
});

export default Test;
