import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import updatesRouter from './routes/updates.js'; // Make sure this is imported


const app = express();

// Get allowed origin from environment variable or fallback to localhost
const allowedOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:3000';

// Middleware
app.use(cors({
  origin: [allowedOrigin],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Mount auth routes - this connects all routes from auth.js
app.use('/auth', authRoutes);
// Mount updates routes - this connects all routes from updates.js
app.use('/api/updates', updatesRouter);

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;