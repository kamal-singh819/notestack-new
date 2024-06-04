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
import requestsRoutes from './routes/requestRoutes.js';
import dbConnection from './config/dbConnection.js';

dbConnection(process.env.CONNECTION_STRING);
const PORT = process.env.PORT || 5001;
const app = express();

const allowedOrigins = ['https://notestack-app.vercel.app', 'http://localhost:5173'];

app.use(cors({
    origin: allowedOrigins,
    methods: 'GET,PUT,POST,DELETE',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use("/public/cdn", express.static('public/images'));
app.use('/users', usersRoutes);
app.use('/categories', categoriesRoutes);
app.use('/notes', notesRoutes);
app.use('/articles', articlesRoutes);
app.use('/subjects', subjectsRoutes);
app.use('/pyqs', pyqsRoutes);
app.use('/requests', requestsRoutes);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is listening on the Port : ${PORT}`));