const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
// const rateLimit = require('express-rate-limit'); // Optional for valid node environment

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const vaultRoutes = require('./routes/vaultRoutes');
const logRoutes = require('./routes/logRoutes');
const threatRoutes = require('./routes/threatRoutes');

const app = express();

// Security Check: Enforce encryption key existence
if (!process.env.ENCRYPTION_KEY) {
    console.error('CRITICAL: ENCRYPTION_KEY is missing from environment.');
    process.exit(1);
}
if (process.env.ENCRYPTION_KEY.length < 32) {
    console.warn('WARNING: ENCRYPTION_KEY is less than 32 bytes. Although scrypt will derive a safe key, for maximum entropy, a 32-character secret is recommended.');
}

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Rate Limiting (Simulated/Basic)
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, 
//   max: 100 
// });
// app.use(limiter);

// Routes
// Removed const declarations for vaultRoutes, logRoutes, threatRoutes, scanRoutes
// as they are now directly required in app.use calls.

app.use('/api/auth', authRoutes);
app.use('/api/passwords', require('./routes/vaultRoutes'));
app.use('/api/logs', require('./routes/logRoutes'));
app.use('/api/threats', require('./routes/threatRoutes'));
app.use('/api/scans', require('./routes/scanRoutes'));
app.use('/api/academy', require('./routes/academyRoutes'));

app.get('/', (req, res) => {
    res.send('SecurePassGuard API is running...');
});

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
