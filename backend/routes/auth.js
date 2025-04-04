const express = require('express');
const router = express.Router();
const User = require('../models/User');
const fetch = require('node-fetch');

// ارسال کد تایید به شماره تلفن
router.post('/send-code', async (req, res) => {
  const { phone } = req.body;

  // تولید کد تصادفی
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  // ارسال پیامک با استفاده از Textbelt
  const response = await fetch('https://textbelt.com/text', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      phone,
      message: `Your verification code is: ${code}`,
      key: process.env.TEXTBELT_KEY, // کلید API از متغیر محیطی
    }),
  });

  if (response.ok) {
    // ذخیره یا بروزرسانی کاربر در دیتابیس
    let user = await User.findOneAndUpdate(
      { phone },
      { code },  // ذخیره کد برای تایید
      { upsert: true, new: true }
    );

    res.json({ success: true });
  } else {
    res.status(400).json({ error: 'Failed to send SMS' });
  }
});

// تایید کد ارسال شده
router.post('/verify-code', async (req, res) => {
  const { phone, code } = req.body;

  // پیدا کردن کاربر در دیتابیس
  let user = await User.findOne({ phone });

  if (!user) {
    return res.status(400).json({ error: 'User not found' });
  }

  // بررسی صحت کد
  if (user.code === code) {
    res.json({ success: true });
  } else {
    res.status(400).json({ error: 'Invalid code' });
  }
});

module.exports = router;
