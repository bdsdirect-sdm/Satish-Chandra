import express from 'express';
import sequelize from './database';
import router from './routes/routes';
import uploads from './routes/uploads';
import cors from 'cors';
import Test from './models/Test';
const app = express();

app.use(express.json());
app.use(cors({
    origin: true,
    optionsSuccessStatus: 200
}));
app.get('/', (req, res) => {
    res.send('Welcome to the user API!');
});
app.use('/', router);
app.use('/upload', uploads);

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        await Test.sync({ force: false }); // Creates the User table if it doesn't exist

        app.listen(3004, () => {
            console.log('Server is running  http://localhost:3004');
        });
    } catch (error: any) {
        console.error('Unable to connect to the database:', error);
    }
};

startServer();


