const express = require('express');
const router = express.Router();
const fetch = require('node-fetch'); // مطمئن شو نصب شده
const User = require('../models/User');

const generatedCodes = {}; // حافظه موقت

router.post('/send-code', async (req, res) => {
  const { phone } = req.body;
  if (!phone) {
    return res.status(400).json({ success: false, error: 'شماره وارد نشده' });
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  generatedCodes[phone] = code;

  const textbeltRes = await fetch('https://textbelt.com/text', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      phone: phone,
      message: `کد ورود شما: ${code}`,
      key: 'textbelt' // از نسخه رایگان استفاده می‌کنیم
    })
  });

  const data = await textbeltRes.json();
  console.log('Textbelt response:', data);

  if (data.success) {
    res.json({ success: true });
  } else {
    res.status(500).json({ success: false, error: data.error || 'ارسال پیامک ناموفق بود' });
  }
});

router.post('/verify-code', (req, res) => {
  const { phone, code } = req.body;
  if (generatedCodes[phone] && generatedCodes[phone] === code) {
    delete generatedCodes[phone];
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false, error: 'کد اشتباه است' });
  }
});

module.exports = router;
