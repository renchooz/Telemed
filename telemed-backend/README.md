# Telemedicine Backend API

This is the backend API for a telemedicine platform where pharmacies connect patients to doctors. It includes JWT-based authentication, WebSocket real-time updates, and RESTful APIs for doctors, sessions, and device registration.

---

## 🚀 Tech Stack
- Node.js + Express
- MongoDB + Mongoose
- JWT (with httpOnly cookies)
- WebSocket (`socket.io`)
- Logger Middleware

🛠 Setup Instructions

### 1. Clone the Repo
### 2. Install Dependencies
### 3. Environment Variables
Create a `.env` file from `.env.example`
### 4. Run the Server

## 🧪 API Endpoints
### 👨‍⚕️ Doctor
- `POST /api/doctors/register` - Register doctor
- `POST /api/doctors/login` - Login doctor
- `PUT /api/doctors/avalibility` - Toggle availability (protected)
- `GET /api/doctors/onlinedr` - Get online doctors
- `GET /api/doctors/getdr` - Get all doctors

### 🏥 Devices
- `POST /api/devices/add` - Register a pharmacy device
- `GET /api/devices/all` - all registerd device

### 🩺 Sessions
- `POST /api/sessions/start` - Start session from a device
- `GET /api/sessions/active` - List active sessions (protected)
- `PUT /api/sessions/end` - End session (protected)

## 🔌 WebSocket Events
- `doctorStatusChange` → Client emits availability status
- `doctorStatusUpdated` → Broadcasted when a doctor becomes available/unavailable


## 📂 Folder Structure
```
- controllers/
- routes/
- models/
- middleware/
- config/
- utils/
```


## 🔒 Authentication
- JWT stored in httpOnly cookies
- Middleware `protect` checks token for protected 



## 📬 Contact
For questions, contact [rjsharma.rs967@gmail.com]
