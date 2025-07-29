const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const watchlistRoutes = require('./routes/watchlistRoutes');

dotenv.config();

if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
    console.error(' Missing environment variables: MONGO_URI or JWT_SECRET');
    process.exit(1);
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json());



// Connect DB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log(' MongoDB Connected'))
.catch(err => {
    console.error(' MongoDB connection error:', err);
    process.exit(1);
});

mongoose.connection.on('error', err => console.error('MongoDB Error:', err));
mongoose.connection.on('disconnected', () => console.warn('MongoDB Disconnected'));

app.use('/api/auth', authRoutes);
app.use('/api/watchlist', watchlistRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


process.on('uncaughtException', err => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});
process.on('unhandledRejection', err => {
    console.error('Unhandled Rejection:', err);
    process.exit(1);
});
