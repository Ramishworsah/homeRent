import express from 'express';
import http from 'http';
import cors from 'cors';
import 'dotenv/config';
import colors from 'colors';

import connectDB from './utils/connectDB.js';
import errorHandler from './middlewares/errorHandler.js';
import userRoutes from './routes/userRoutes.js';
import propertyRoutes from './routes/propertyRoutes.js';

const app = express();

connectDB();

app.use(cors(
    {
        origin: ['http://localhost:3000','http://localhost:5173'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
    }
))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', userRoutes);
app.use('/api/properties', propertyRoutes);

app.use(errorHandler);

const port = process.env.PORT || 5000;
const server = http.createServer(app);

server.listen(port, ()=>{
    console.log(`Server is running on port:`,`http://localhost:${port}`.yellow.bold);
})