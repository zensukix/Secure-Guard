# SecurePassGuard 🛡️
## Intelligent Password Manager & Cyber Threat Visualization System

SecurePassGuard is a full-stack cybersecurity web application designed to demonstrate defensive security techniques, secure data storage, and real-time threat intelligence visualization.

**Project Type**: MCA Major Project (Academic)
**Stack**: MERN (MongoDB, Express, React, Node.js)

---

## 🚀 Features

### Core Security Features
- **Zero-Trust Authentication**: JWT-based secure login with bcrypt password hashing.
- **AES-256 Encrypted Vault**: Passwords are encrypted before storage using AES-256 algorithm.
- **Password Strength Analyzer**: Real-time evaluation of password complexity.
- **Privacy First**: Passwords are never sent to the frontend unless explicitly revealed by the authenticated user.

### Cyber Intelligence (Simulated)
- **Live Threat Map**: Interactive 3D-style map showing global simulated cyber attacks in real-time.
- **Breach Exposure Checker**: Check if an email has been compromised in (simulated) data breaches.
- **Security Posture Score**: Dynamic risk scoring based on vault hygiene.
- **Audit Logging**: Immutable logs of all user activities (Login, Add, Reveal, Delete).

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (Local or Atlas URL)

### 1. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file in the `server` folder (mock provided):
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/securepassguard
JWT_SECRET=your_jwt_secret_key_here
ENCRYPTION_KEY=0123456789abcdef0123456789abcdef  # Must be 32 chars
```

Start the server:
```bash
npm run dev
```

### 2. Frontend Setup
```bash
cd client
npm install
```

Start the React Development Server:
```bash
npm run dev
```

The application will launch at `http://localhost:5173`.

---

## 📂 Project Structure

```
SecurePassGuard/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application views (Vault, Map, Dashboard)
│   │   ├── context/        # Auth State Management
│   │   └── utils/          # Helper functions
├── server/                 # Node.js Backend
│   ├── models/             # Mongoose Schemas
│   ├── routes/             # API Endpoints
│   ├── middleware/         # Auth & Security Middleware
│   └── utils/              # Encryption Logic
```

---

## ⚠️ Disclaimer
**EDUCATIONAL USE ONLY**. All threat data, breach checks, and attack maps are **SIMULATED** for demonstration purposes. This tool does not satisfy enterprise security standards for real-world deployment without further auditing.
