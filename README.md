# cybersecurity-internship
Week by week cybersecurity learning &amp; assessment

## Week 1 — Security Assessment
- ✅ Set up OWASP Juice Shop
- ✅ Found XSS Vulnerability (Reflected + Stored)
- ✅ SQL Injection — Admin Access Gained
- ✅ OWASP ZAP Automated Scan
- ✅ Generated Security Assessment Report

## Week 2 — Implementing Security Measures

- ✅ Input Validation & Sanitization (validator)
- ✅ Password Hashing (bcrypt)
- ✅ Token-Based Authentication (JWT)
- ✅ Secure HTTP Headers (helmet)
- ✅ Tested Register & Login API with Postman

## Week 3 — Advanced Security & Final Reporting

- ✅ Basic Penetration Testing with Nmap
- ✅Simulated Unauthorized Access & Parameter Tampering
- ✅ Verified JWT Middleware & Input Validation Effectiveness
- ✅ Integrated Winston Logging (Console + File)
- ✅ Logged Login Attempts & Failed Access Events
- ✅ Compiled Final Security Best Practices Checklist

# Week 4: Advanced Threat Detection & Web Security

## Overview
Implemented advanced security measures including intrusion detection, API hardening, and security headers.

---

## Task 1: Intrusion Detection & Monitoring

### Fail2Ban Setup
- Installed Fail2Ban on Kali Linux for real-time intrusion detection
- Configured SSH jail to monitor failed login attempts
- Set ban time to 1 hour (3600 seconds)
- Maximum 5 failed attempts allowed before IP gets banned
- Find time window set to 10 minutes (600 seconds)

### Configuration
- Created `/etc/fail2ban/jail.local` with custom rules
- SSH jail enabled and actively monitoring port 22
- Verified with `fail2ban-client status` — sshd jail running

---

## Task 2: API Security Hardening

### Rate Limiting (express-rate-limit)
- Global rate limit: 100 requests per 15 minutes
- Login endpoint limit: 5 attempts per 15 minutes
- Returns error message on limit exceeded
- Prevents brute-force attacks effectively

### CORS Configuration
- Restricted to specific origins only (localhost:3000)
- Allowed methods: GET, POST, PUT, DELETE
- Custom headers configured: Content-Type, Authorization, x-api-key
- Credentials enabled for authenticated requests

### API Key Authentication
- Custom middleware to validate API keys
- Keys stored securely in `.env` file
- Returns 401 Unauthorized for invalid/missing keys
- Protected route `/api/protected` requires valid API key

---

## Task 3: Security Headers & CSP

### Content Security Policy (CSP)
- Default source restricted to self only
- Script source limited to trusted origins
- Object source set to none (prevents plugin attacks)
- Image source allows self, data URIs, and HTTPS

### HSTS (HTTP Strict Transport Security)
- Max age set to 1 year (31,536,000 seconds)
- Include subdomains enabled
- Preload flag enabled
- Forces HTTPS on all connections

### Helmet.js Headers
- X-Frame-Options: Prevents clickjacking
- X-Content-Type-Options: Prevents MIME sniffing
- X-XSS-Protection: Cross-site scripting protection

---

## Testing Results

| Test | Endpoint | Result |
|------|----------|--------|
| Public route | GET / | ✅ 200 OK |
| No API key | GET /api/protected | ✅ 401 Unauthorized |
| Valid API key | GET /api/protected | ✅ 200 OK + data |
| Valid login | POST /api/login | ✅ 200 Login successful |
| Rate limit check | GET / | ✅ Headers visible |

---

## Installation

```bash
npm install
```

## Environment Variables
Create `.env` file:
