import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware.js';
import employeeRoutes from './routes/empleados.routes.js';

const app = express();

app.set('puerto', process.env.PORT || 3000);
app.set('nombreApp', 'Gestion de empleados');

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use('/api/v1', employeeRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
