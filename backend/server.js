const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// اتصال به دیتابیس
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Middleware
app.use(express.json());
app.use(morgan('dev')); // برای لاگ درخواست‌ها
app.use(express.static(path.join(__dirname, '../frontend')));

// نمایش لاگ دستی برای هر درخواست
app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.originalUrl}`);
  next();
});

// مسیردهی API
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// fallback route: برای SPA و صفحات ثابت
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'), (err) => {
    if (err) {
      console.error('❌ Error sending index.html:', err);
      res.status(500).send('Server Error');
    }
  });
});

// فعال‌سازی سرور
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
