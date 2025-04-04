const express = require('express');
const router = express.Router();
const fetch = require('node-fetch'); // باید نصب شده باشه: npm install node-fetch
const User = require('../models/User');

// ارسال کد تأیید
router.post('/send-code', async (req, res) => {
  const { phone } = req.body;
  const verificationCode = Math.floor(100000 + Math.random() * 900000);

  // ذخیره یا بروزرسانی کد در دیتابیس
  await User.findOneAndUpdate(
    { phone },
    { phone, code: verificationCode },
    { upsert: true, new: true }
  );

  // ارسال پیامک با Textbelt
  const smsResponse = await fetch('https://textbelt.com/text', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      phone: phone,
      message: `Your verification code is: ${verificationCode}`,
      key: 'textbelt',
    }),
  });

  const result = await smsResponse.json();

  if (result.success) {
    res.json({ success: true, message: 'Code sent!' });
  } else {
    res.status(400).json({ success: false, error: result.error || 'Failed to send SMS' });
  }
});

module.exports = router;
