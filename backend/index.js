import express from 'express';
import dotenv from 'dotenv'; dotenv.config();
import cors from 'cors';
import errorHandler from './middlewares/errorHandler.js';
import usersRoutes from './routes/usersRoutes.js';
import categoriesRoutes from './routes/categoriesRoutes.js';
import notesRoutes from './routes/notesRoutes.js';
import dbConnection from './config/dbConnection.js';

dbConnection(process.env.CONNECTION_STRING);
const PORT = process.env.PORT || 5001;
const app = express();

app.use(express.json());
app.use(cors());
app.use('/users', usersRoutes);
app.use('/categories', categoriesRoutes);
app.use('/notes', notesRoutes);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is listening on the Port : ${PORT}`));