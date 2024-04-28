import express from 'express';
import dotenv from 'dotenv'; dotenv.config();
import cors from 'cors';
import errorHandler from './middlewares/errorHandler.js';
import usersRoutes from './routes/usersRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import dbConnection from './config/dbConnection.js';

dbConnection(process.env.CONNECTION_STRING);
const PORT = process.env.PORT || 5001;
const app = express();

app.use(express.json());
app.use(cors());
app.use('/users', usersRoutes);
app.use('/admin', adminRoutes);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is listening on the Port : ${PORT}`));