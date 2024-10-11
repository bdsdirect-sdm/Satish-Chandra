import express from 'express';
import sequelize from './database';
import router from './routes/routes';
import uploads from './routes/uploads';
import CORS from 'cors';
const app = express();

app.use(express.json());
app.use(CORS({
    origin: true,
    optionsSuccessStatus: 200
}));
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/', router);
app.use('/', uploads);


const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        await sequelize.sync(); // Creates the User table if it doesn't exist

        app.listen(3004, () => {
            console.log('Server is running  http://localhost:3004');
        });
    } catch (error: any) {
        console.error('Unable to connect to the database:', error);
    }
};

startServer();



