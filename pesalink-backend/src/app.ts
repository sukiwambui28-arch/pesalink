// pesalink-backend/src/app.ts
import express from 'express';
import cors from 'cors';
import dashboardRoutes from './routes/dashboardRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/dashboard', dashboardRoutes); // 👈 mount here

export default app;
