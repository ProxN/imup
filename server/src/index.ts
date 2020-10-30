import express, { Application, Response, Request, NextFunction } from 'express';
import cors from 'cors';
import uploadRoutes from './api/upload.routes';

const app: Application = express();

/* Midellwares */

const allowedOrigins = ['http://localhost:3000'];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          'The CORS policy for this site does not ' +
          'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

app.use(express.json());

/* Routes */
app.use('/api/upload', uploadRoutes);

/* Global Error handler */

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({
    status: 'fail',
    message: err.message,
  });
});

app.get('*', (req: Request, res: Response) => {
  res.status(404).json({
    status: 'fail',
    message: `You just hit a route (${req.originalUrl}) that doesn't exist... the sadness.`,
  });
});

export default app;
