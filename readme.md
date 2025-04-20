
# MagesticMotors - Backend

🔗 **Live Site (Frontend):** [https://car-shop-frontend-xi.vercel.app/](https://car-shop-frontend-xi.vercel.app/)  
🔗 **Live Server (Backend):** [https://car-shop-backend-amber.vercel.app/](https://car-shop-backend-amber.vercel.app/)

MagesticMotors is a modern and secure Car Shop web application. This backend powers the application’s authentication, role-based authorization, product and order management, and more.

---

## 🚀 Features

### 🧑‍💻 Authentication & Authorization

- **User Registration:** Name, Email, Password (hashed with bcrypt)
- **Login:** Generates secure **JWT token**
- **Role-based Access:** `user` by default, `admin` updated manually
- **Logout:** Token removed from localStorage (handled frontend side)
- **Password Security:** Hashed before storing

### 🌐 Public APIs

- Home Page Data (Banner, Featured Products, etc.)
- All Products API with:
  - Search (brand, name, category)
  - Filters (price, model, brand, category, availability)
- Product Details API
- About Page Content

### 🔒 Private APIs (JWT Protected)

- **Checkout Page:**
  - Validates stock
  - Accepts orders with user/product details
  - Simulated SurjoPay payment integration

- **User Dashboard:**
  - View Orders
  - Update Profile
  - Change Password (with current password check)

- **Admin Dashboard:**
  - CRUD: Products, Users, Orders
  - Update Order Status (Pending → Delivered)
  - Set Estimated Delivery Date

### 📦 Order Tracking (Optional Feature)

- Track current order status with labels and steps
- Admin can update status from dashboard

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB (No Mongoose)**
- **JWT** – Auth Token
- **bcrypt** – Password Hashing
- **dotenv** – Environment Variables
- **Helmet & CORS** – Security

---

## 📁 Folder Structure

```
car-shop-backend/
├── routes/
├── middleware/
├── controllers/
├── utils/
├── config/
├── .env
├── server.js
└── package.json
```

---

## ⚙️ Setup Instructions

### 1. Clone & Install

```bash
git clone https://github.com/tazim5032/car-shop-server.git
cd car-shop-server
npm install
```

### 2. Create `.env` File

```env
PORT=5000
MONGO_URI=your_mongo_db_connection
JWT_SECRET=your_secret_key
```

### 3. Run Server

```bash
npm run dev   # For development
npm start     # For production
```

---

## 🧪 Error Handling & UX

- Meaningful error messages:
  - Invalid login
  - Duplicate registration
  - Out-of-stock issues
- API responses handled via toast notifications (frontend)
- Loading indicators shown during fetch/login

---

## 📄 License

MIT License – Free to use, modify, and distribute.

---

## 🙌 Author

Developed by **Mohammad Fakhrul Islam**

---

