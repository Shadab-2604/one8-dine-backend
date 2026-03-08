# One8 Dine - Quick Start Guide

**TL;DR - Get up and running in 5 minutes!**

---

## Prerequisites Checklist

- [ ] Node.js installed (https://nodejs.org)
- [ ] MongoDB Atlas account (https://mongodb.com/cloud/atlas)
- [ ] Code editor (VS Code recommended)

---

## 5-Minute Setup

### 1. Create `.env` File (1 min)

Create file named `.env` in `one8-dine-backend/` folder:

```dotenv
MONGODB_URI=mongodb+srv://shaikhshadab2604_db_user:nxOcsSV5neK1sEsM@cluster0.3d3ogc2.mongodb.net/one8-dine
JWT_SECRET=7jANkO3xqLy5zFnbpahOfqwfgtfvRFjERjYAyiQ79t8
ADMIN_USERNAME=admin123@gmail.com
ADMIN_PASSWORD=admin@123
PORT=5000
```

**⚠️ Replace with your own MongoDB URI from Atlas!**

### 2. Install Dependencies (2 min)

```bash
npm install
```

### 3. Start Backend (1 min)

```bash
npm run dev
```

### 4. Test It (1 min)

Visit: http://localhost:5000/api/health

Should return:
```json
{
  "status": "healthy",
  "timestamp": "..."
}
```

✅ **Done!**

---

## Common Tasks

### Get MongoDB URI

1. Go to https://www.mongodb.com/cloud/atlas
2. Login/Signup
3. Create cluster (M0 Free)
4. Create database user
5. Click "Connect" → "Drivers"
6. Copy connection string

### Change Admin Credentials

Edit `.env`:
```
ADMIN_USERNAME=your_new_email@example.com
ADMIN_PASSWORD=your_new_password
```

### Stop Server

Press `Ctrl + C` in terminal

### Production Build

```bash
npm start
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "npm not found" | Reinstall Node.js from nodejs.org |
| "MongoDB connection error" | Check `.env` has correct MONGODB_URI |
| "Port 5000 in use" | Change PORT to 5001 in `.env` |
| "Cannot find module" | Run `npm install` |

---

## Next Steps

1. ✅ Setup backend locally
2. Setup frontend locally (See frontend README)
3. Deploy to Render (See main README)
4. Deploy to Vercel (See main README)

---

For detailed setup, see `README.md`
