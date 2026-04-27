const express = require('express');
const winston = require('winston');
const helmet = require('helmet');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());
app.use(helmet()); // Security headers

// ===== WINSTON LOGGER SETUP =====
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'security.log' }),
    new winston.transports.File({ filename: 'errors.log', level: 'error' })
  ]
});

logger.info('Application started');

// ===== ROUTES =====
app.get('/', (req, res) => {
  logger.info(`GET / from IP: ${req.ip}`);
  res.send('Welcome to Secure App!');
});

// Login route with input validation
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Input validation
  if (!username || !password) {
    logger.warn(`Failed login attempt - missing fields from IP: ${req.ip}`);
    return res.status(400).json({ error: 'Username and password required' });
  }

  // Hash password example
  const hashed = await bcrypt.hash(password, 10);
  logger.info(`User ${username} logged in successfully`);
  
  res.json({ message: 'Login successful', hashedPassword: hashed });
});

// Error handling
app.use((err, req, res, next) => {
  logger.error(`Error: ${err.message}`);
  res.status(500).send('Something broke!');
});

app.listen(3000, () => {
  logger.info('Server running on http://localhost:3000');
});