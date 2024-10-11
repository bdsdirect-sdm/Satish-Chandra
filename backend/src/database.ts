import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('testing', 'root', 'Password123#@!', {
    host: 'localhost',
    dialect: 'mysql',
});

export default sequelize;
