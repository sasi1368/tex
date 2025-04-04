const express = require('express');
const app = express();
const path = require('path');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

// اتصال به دیتابیس
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

// برای لاگ‌گیری از درخواست‌ها
app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.url}`);
  next();
});

// سرو استاتیک از پوشه frontend
app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.json());

// مسیرهای API
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// هندل مسیرهای دیگر با index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// اجرای سرور
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
