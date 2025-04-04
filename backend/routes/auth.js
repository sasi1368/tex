// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const User = require('../models/User'); // بررسی وجود این فایل

// ارسال کد
router.post('/send-code', async (req, res) => {
  try {
    const { phone } = req.body;
    console.log('📞 دریافت شماره:', phone);

    const response = await fetch('https://textbelt.com/text', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone: phone,
        message: 'کد تایید شما: 123456',
        key: 'textbelt', // رایگان
      }),
    });

    const data = await response.json();
    console.log('📨 پاسخ از textbelt:', data);

    if (data.success) {
      res.json({ success: true });
    } else {
      res.status(400).json({ success: false, error: data.error });
    }
  } catch (err) {
    console.error('❌ خطا در ارسال کد:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;
