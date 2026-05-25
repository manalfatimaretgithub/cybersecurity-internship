const express   = require('express');
const helmet    = require('helmet');
const cors      = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
app.use(express.json());

// 1. RATE LIMITING
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests! Try after 15 minutes.' }
});
app.use(limiter);

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many login attempts! Blocked.' }
});

// 2. CORS
app.use(cors({
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
  credentials: true
}));

// 3. SECURITY HEADERS
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc:  ["'self'"],
    styleSrc:   ["'self'", "'unsafe-inline'"],
    imgSrc:     ["'self'", "data:", "https:"],
    objectSrc:  ["'none'"],
  },
}));
app.use(helmet.hsts({
  maxAge: 31536000,
  includeSubDomains: true,
  preload: true
}));

// 4. API KEY AUTH
const apiKeyAuth = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({ error: 'Unauthorized — Invalid API Key!' });
  }
  next();
};

// ROUTES
app.get('/', (req, res) => {
  res.json({ message: 'Server is running and secure!' });
});

app.post('/api/login', loginLimiter, (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'password123') {
    res.json({ success: true, message: 'Login successful!' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials!' });
  }
});

app.get('/api/protected', apiKeyAuth, (req, res) => {
  res.json({
    success: true,
    message: 'You accessed protected data!',
    data: { user: 'admin', role: 'superuser' }
  });
});

app.get('/api/public', (req, res) => {
  res.json({ message: 'This is public data!' });
});

// START
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`✅ Rate Limiting: Active`);
  console.log(`✅ CORS: Configured`);
  console.log(`✅ Security Headers: Active`);
  console.log(`✅ API Key Auth: Active`);
});