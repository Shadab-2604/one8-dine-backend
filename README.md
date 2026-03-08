"# One8 Dine - Backend Setup Guide

Complete setup guide for running One8 Dine backend locally, and deploying to Render.

---

## Table of Contents
1. [System Requirements](#system-requirements)
2. [Step 1: Install Node.js](#step-1-install-nodejs)
3. [Step 2: Setup MongoDB](#step-2-setup-mongodb)
4. [Step 3: Clone & Setup Project](#step-3-clone--setup-project)
5. [Step 4: Configure Environment Variables](#step-4-configure-environment-variables)
6. [Step 5: Run Backend Locally](#step-5-run-backend-locally)
7. [Step 6: Deploy to Render](#step-6-deploy-to-render)
8. [Step 7: Deploy Frontend to Vercel](#step-7-deploy-frontend-to-vercel)
9. [API Endpoints](#api-endpoints)
10. [Troubleshooting](#troubleshooting)

---

## System Requirements

Before starting, ensure you have:
- **Windows 10/11**, macOS, or Linux
- **Internet connection**
- **Administrator access** (for installations)
- **Minimum 2GB RAM**
- **Code editor** (VS Code recommended)

---

## Step 1: Install Node.js

### On Windows:

1. Visit **https://nodejs.org/en/download**
2. Click "Download LTS" (Long Term Support) - currently **v20.x**
3. Run the installer `.msi` file
4. Follow the installation wizard:
   - ✅ Accept License Agreement
   - ✅ Select Installation Path (default is fine)
   - ✅ Keep all checkboxes selected (npm will auto-install)
   - ✅ Click "Install"
5. **Restart your computer** after installation

### Verify Installation:

Open **Command Prompt** or **PowerShell** and run:
```bash
node --version
npm --version
```

You should see version numbers like:
```
v20.11.0
9.2.0
```

### On macOS:

```bash
# Using Homebrew (if not installed: /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)")
brew install node
```

### On Linux (Ubuntu/Debian):

```bash
sudo apt update
sudo apt install nodejs npm
```

---

## Step 2: Setup MongoDB

### Option A: MongoDB Atlas (Cloud - Recommended for Beginners)

MongoDB Atlas is a cloud-hosted MongoDB service. Free tier includes 512MB storage.

#### Steps:

1. **Create MongoDB Account**
   - Go to **https://www.mongodb.com/cloud/atlas**
   - Click "Start Free"
   - Sign up with email

2. **Create Organization & Project**
   - After login, create a new project named `one8-dine`
   - Click "Create"

3. **Create a Cluster**
   - Click "Create Deployment"
   - Select **M0 (Free Forever)** tier
   - Select region closest to you
   - Click "Create"
   - Wait 2-3 minutes for cluster creation

4. **Create Database User**
   - Go to "Database Access" (left sidebar)
   - Click "Add New Database User"
   - Username: `shaikhshadab2604_db_user`
   - Password: `nxOcsSV5neK1sEsM` (or create your own, remember it!)
   - Click "Add User"

5. **Setup Network Access**
   - Go to "Network Access" (left sidebar)
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (IP: 0.0.0.0/0)
   - Click "Confirm"

6. **Get Connection String**
   - Go to "Database" → "Clusters"
   - Click "Connect"
   - Select "Drivers"
   - Copy the connection string
   - It looks like:
   ```
   mongodb+srv://shaikhshadab2604_db_user:nxOcsSV5neK1sEsM@cluster0.3d3ogc2.mongodb.net/
   ```

### Option B: MongoDB Local Installation

If you prefer local MongoDB:

1. Download from **https://www.mongodb.com/try/download/community**
2. Run installer and follow setup
3. Connection string:
```
mongodb://localhost:27017/one8-dine
```

---

## Step 3: Clone & Setup Project

### 1. Create Project Directory

Open Command Prompt and run:
```bash
cd C:\Users\YourUsername\Desktop
mkdir one8-dine-project
cd one8-dine-project
```

### 2. Extract Backend ZIP

- Download the `one8-dine-backend.zip`
- Right-click → **Extract All**
- Extract to `C:\Users\YourUsername\Desktop\one8-dine-project`

### 3. Extract Frontend ZIP

- Download the `one8-dine-frontend.zip`
- Right-click → **Extract All**
- Extract to the same project folder

Your folder structure should look like:
```
one8-dine-project/
├── one8-dine-backend/
├── one8-dine-frontend/
```

### 4. Install Backend Dependencies

```bash
cd one8-dine-backend
npm install
```

This installs all required packages (Express, Mongoose, JWT, etc.)

---

## Step 4: Configure Environment Variables

### Create `.env` File

1. Open the `one8-dine-backend` folder in **VS Code**
2. Right-click in the file explorer → **New File**
3. Name it `.env` (exactly!)

### Add Environment Variables

Copy and paste the following into `.env`:

```dotenv
# MongoDB Connection String
MONGODB_URI=mongodb+srv://shaikhshadab2604_db_user:nxOcsSV5neK1sEsM@cluster0.3d3ogc2.mongodb.net/one8-dine

# JWT Secret (keep it secret!)
JWT_SECRET=7jANkO3xqLy5zFnbpahOfqwfgtfvRFjERjYAyiQ79t8

# Admin Credentials
ADMIN_USERNAME=admin123@gmail.com
ADMIN_PASSWORD=admin@123

# Backend Port
PORT=5000
```

### Important Notes:

⚠️ **Replace These with Your Own Values:**
- `MONGODB_URI` - Use your MongoDB connection string from Step 2
- `JWT_SECRET` - Generate a random string (min 32 characters)
- `ADMIN_USERNAME` & `ADMIN_PASSWORD` - Your admin login credentials

**Never commit `.env` to Git!** It's already in `.gitignore`

---

## Step 5: Run Backend Locally

### Development Mode (with Auto-Reload)

```bash
npm run dev
```

You should see:
```
[nodemon] starting `node server.js`
[dotenv] injecting env from .env
Server running on http://localhost:5000
✓ MongoDB connected successfully
```

### Production Mode

```bash
npm start
```

### Test the Backend

Open your browser and visit:
```
http://localhost:5000/api/health
```

You should see:
```json
{
  "status": "healthy",
  "timestamp": "2024-03-09T10:30:00.000Z"
}
```

### Stop the Server

Press `Ctrl + C` in the terminal

---

## Step 6: Deploy to Render

### What is Render?

Render is a free hosting platform that runs your Node.js backend. Backend will be live 24/7.

### Deployment Steps:

#### 1. Create Render Account

- Go to **https://render.com**
- Click "Sign up"
- Sign up with GitHub or email

#### 2. Connect GitHub Repository

- Go to **Dashboard** → **New+**
- Select **Web Service**
- Click "Build and deploy from a Git repository"
- Click "Connect account" to connect GitHub
- Authorize Render to access your GitHub

#### 3. Select Repository

- Find and select `one8-dine-backend` repository
- Click "Deploy"

#### 4. Configure Deployment

Fill in the form:

| Field | Value |
|-------|-------|
| **Name** | `one8-dine-backend` |
| **Environment** | `Node` |
| **Region** | Select closest to you |
| **Branch** | `main` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |

#### 5. Add Environment Variables

- Scroll down to **Environment**
- Click **Add Environment Variable** for each:

```
MONGODB_URI = mongodb+srv://shaikhshadab2604_db_user:nxOcsSV5neK1sEsM@cluster0.3d3ogc2.mongodb.net/one8-dine
JWT_SECRET = 7jANkO3xqLy5zFnbpahOfqwfgtfvRFjERjYAyiQ79t8
ADMIN_USERNAME = admin123@gmail.com
ADMIN_PASSWORD = admin@123
PORT = 5000
```

#### 6. Deploy

- Click **Deploy Web Service**
- Wait 3-5 minutes for deployment
- You'll get a URL like: `https://one8-dine-backend.onrender.com`

#### 7. Test Deployed Backend

Visit:
```
https://one8-dine-backend.onrender.com/api/health
```

Should return health status ✓

---

## Step 7: Deploy Frontend to Vercel

### What is Vercel?

Vercel is a free hosting platform optimized for React/Vite apps. Frontend will be live instantly.

### Deployment Steps:

#### 1. Create Vercel Account

- Go to **https://vercel.com**
- Click "Sign Up"
- Sign up with GitHub

#### 2. Import Project

- Click **New Project**
- Click **Import Git Repository**
- Select `one8-dine` (the frontend repo)
- Click **Import**

#### 3. Configure Project

Fill the form:

| Field | Value |
|-------|-------|
| **Framework Preset** | `Vite` |
| **Root Directory** | `./one8-dine-frontend` |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |

#### 4. Add Environment Variables

- Scroll to **Environment Variables**
- Add:

```
VITE_API_URL = https://one8-dine-backend.onrender.com
```

This tells frontend where your backend is running.

#### 5. Deploy

- Click **Deploy**
- Wait 2-3 minutes
- Get a URL like: `https://one8-dine.vercel.app`

#### 6. Test Frontend

Visit your URL and test:
- ✓ Login/Signup
- ✓ Browse Menu
- ✓ Book Table
- ✓ Place Order
- ✓ Admin Panel

---

## API Endpoints

### Health Check
```
GET /api/health
```

### Authentication
```
POST /api/auth/signup          - User registration
POST /api/auth/login           - User login
GET  /api/auth/me              - Get current user

POST /api/admin/auth/login     - Admin login
GET  /api/admin/auth/me        - Get admin info
```

### Menu
```
GET /api/menu                  - Get all menu items
POST /api/admin/menu           - Create menu item (admin)
PUT  /api/admin/menu/:id       - Update menu item (admin)
DELETE /api/admin/menu/:id     - Delete menu item (admin)
```

### Bookings
```
POST /api/bookings             - Create booking
GET  /api/bookings/my          - Get user bookings
DELETE /api/bookings/:id       - Cancel booking

GET /api/admin/bookings        - Get all bookings (admin)
PUT /api/admin/bookings/:id/status - Update booking status (admin)
```

### Orders (NEW)
```
POST /api/orders               - Create order (with table selection)
GET  /api/orders/my            - Get user orders
GET  /api/admin/orders         - Get all orders (admin)
PUT  /api/admin/orders/:id/status - Update order status (admin)
```

### Tables
```
GET /api/tables/availability   - Check table availability
```

---

## Environment Variables Reference

### `.env` File Structure

```dotenv
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/databasename

# Security
JWT_SECRET=your-secret-key-minimum-32-characters-long

# Admin 
ADMIN_USERNAME=admin@example.com
ADMIN_PASSWORD=securepassword123

# Server
PORT=5000
```

### Variable Descriptions

| Variable | Purpose | Example |
|----------|---------|---------|
| `MONGODB_URI` | MongoDB connection | `mongodb+srv://user:pass@cluster0...` |
| `JWT_SECRET` | Token encryption | `7jANkO3xqLy5zFnbpahOfqwfgtfvRFjERjYAyiQ79t8` |
| `ADMIN_USERNAME` | Admin login email | `admin@example.com` |
| `ADMIN_PASSWORD` | Admin login password | `admin@123` |
| `PORT` | Server port | `5000` |

---

## Troubleshooting

### 1. "npm command not found"
**Solution:** Node.js not installed. Reinstall from https://nodejs.org/

### 2. "Cannot find module 'mongoose'"
**Solution:** Run `npm install` in the backend folder

### 3. "MONGODB_URI is not defined"
**Solution:** Check if `.env` file exists and has `MONGODB_URI` set

### 4. "Port 5000 already in use"
**Solution:** Change `PORT=5000` to `PORT=5001` in `.env`

### 5. "MongoDB connection timeout"
**Solution:** 
- Check internet connection
- Verify MongoDB URI is correct
- Check MongoDB Network Access allows your IP

### 6. "Frontend cannot connect to backend"
**Solution:**
- Ensure backend is running
- Check `VITE_API_URL` in frontend `.env`
- Verify URLs in `src/lib/api.js`

### 7. "Render deployment fails"
**Solution:**
- Check environment variables are set correctly
- Verify MongoDB URI works
- Check build logs in Render dashboard

### 8. "Vercel deployment shows blank page"
**Solution:**
- Ensure `VITE_API_URL` is set correctly on Vercel
- Redeploy after updating environment variables
- Check browser console for errors

---

## Project Structure

```
one8-dine-backend/
├── config/              - Configuration files
├── controllers/         - Request handlers
├── middleware/          - Express middleware
├── models/             - MongoDB schemas
├── routes/             - API routes
├── services/           - Business logic
├── validations/        - Data validation
├── utils/              - Helper functions
├── .env                - Environment variables (DO NOT COMMIT)
├── .gitignore          - Git ignore file
├── app.js              - Express app setup
├── server.js           - Server entry point
├── package.json        - Dependencies
└── README.md           - This file
```

---

## Key Features Implemented

✅ **User Authentication** - Signup, Login, JWT tokens  
✅ **Table Booking** - Reserve tables, check availability  
✅ **Order Management** - Customers can select items + table  
✅ **Admin Panel** - Manage bookings, orders, menu items, users  
✅ **Real-time Availability** - Orders block tables like bookings  
✅ **Search & Filter** - Search menu, filter by category, sort by price  
✅ **Order Statuses** - pending → confirmed → preparing → served  

---

## Common Tasks

### Change Admin Credentials
Edit in `.env`:
```
ADMIN_USERNAME=newadmin@example.com
ADMIN_PASSWORD=newsecurepassword
```

### Add New Menu Items
Use Admin Panel at `/admin/menu` or API:
```bash
POST /api/admin/menu
Body: {
  "name": "Margherita Pizza",
  "category": "Mains",
  "price": 12.99,
  "description": "Fresh mozzarella and basil"
}
```

### Generate New JWT Secret
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### View MongoDB Data
Visit MongoDB Atlas Dashboard → Collections → Browse your data

---

## Support & Resources

- **MongoDB Atlas Docs:** https://docs.atlas.mongodb.com/
- **Render Docs:** https://render.com/docs
- **Vercel Docs:** https://vercel.com/docs
- **Express.js Docs:** https://expressjs.com/
- **Mongoose Docs:** https://mongoosejs.com/

---

## Next Steps

1. ✅ Install Node.js
2. ✅ Setup MongoDB
3. ✅ Clone project & install dependencies
4. ✅ Create `.env` file
5. ✅ Run backend locally (`npm run dev`)
6. ✅ Install frontend dependencies
7. ✅ Run frontend locally
8. ✅ Deploy backend to Render
9. ✅ Deploy frontend to Vercel
10. ✅ Update frontend `.env` with live backend URL

---

## License

ISC

---

**Last Updated:** March 9, 2024  
**Version:** 1.0.0

For any issues or questions, check the Troubleshooting section above or create an issue on GitHub." 
