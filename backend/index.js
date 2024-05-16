import express from 'express';
import dotenv from 'dotenv'; dotenv.config();
import cors from 'cors';
import errorHandler from './middlewares/errorHandler.js';
import usersRoutes from './routes/usersRoutes.js';
import categoriesRoutes from './routes/categoriesRoutes.js';
import notesRoutes from './routes/notesRoutes.js';
import articlesRoutes from './routes/articlesRoutes.js';
import subjectsRoutes from './routes/subjectsRoutes.js';
import pyqsRoutes from './routes/pyqsRoutes.js';
import dbConnection from './config/dbConnection.js';

dbConnection(process.env.CONNECTION_STRING);
const PORT = process.env.PORT || 5001;
const app = express();

app.use(express.json());
app.use(cors());
app.use('/users', usersRoutes);
app.use('/categories', categoriesRoutes);
app.use('/notes', notesRoutes);
app.use('/articles', articlesRoutes);
app.use('/subjects', subjectsRoutes);
app.use('/pyqs', pyqsRoutes);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is listening on the Port : ${PORT}`));