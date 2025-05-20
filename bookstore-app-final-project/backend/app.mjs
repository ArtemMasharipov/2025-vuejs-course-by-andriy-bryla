import cors from 'cors';
import express from 'express';
import { setupDatabase } from './setup/database.mjs';
import { setupErrorHandling } from './setup/error-handling.mjs';
import { setupMiddleware } from './setup/middleware.mjs';
import { setupRoutes } from './setup/routes.mjs';

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: process.env.CORS_METHODS.split(','),
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: process.env.CORS_CREDENTIALS === 'true',
  }),
);

setupMiddleware(app);
setupDatabase();
setupRoutes(app);
setupErrorHandling(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
