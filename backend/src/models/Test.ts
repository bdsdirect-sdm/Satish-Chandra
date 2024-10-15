import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database'
import '../Validations/userValidationSchema';
// Define the attributes for the User model
// interface UserAttributes {
//     id?: number;

//     createdAt?: Date;
//     updatedAt?: Date;
// }


class Test extends Model {
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public phone!: string;
    public gender!: string;
    public userType!: 'jobSeeker' | 'agency';
    public hobbies?: string[];
    public profileImage?: string;
    public resume?: string;
    public selectedAgency?: string;
}


Test.init(
    {
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
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
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
            type: DataTypes.STRING,
            allowNull: true,
        },
        profileImage: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        resume: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        selectedAgency: {
            type: DataTypes.ENUM('agency1', 'agency2', 'agency3', 'agency4'),
            allowNull: true,
            defaultValue: null,
        },
    },
    {
        sequelize,
        modelName: 'Test',
    }
);

export default Test;