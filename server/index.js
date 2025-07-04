import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();
app.get('/test', (req, res) => res.send('OK'));
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true // if you're using cookies or sessions
}));

app.use(express.json());

const PORT = process.env.PORT || 5050;

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
});

app.use('/api/auth', authRoutes);