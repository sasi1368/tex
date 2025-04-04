const express = require('express');
const router = express.Router();
const axios = require('axios');
const User = require('../models/User'); // مدل User را وارد می‌کنیم
require('dotenv').config();

// ارسال کد تاییدیه از طریق Textbelt
router.post('/send-code', async (req, res) => {
  const { phoneNumber } = req.body;

  // بررسی وارد کردن شماره تلفن
  if (!phoneNumber) {
    return res.status(400).json({ success: false, error: 'Phone number is required' });
  }

  try {
    // ارسال درخواست به API Textbelt
    const response = await axios.post('https://textbelt.com/text', {
      phone: phoneNumber,
      message: 'Your verification code is: 123456', // کد تاییدیه
      key: process.env.TEXTBELT_KEY
    });

    if (response.data.success) {
      console.log(`📲 کد تایید به شماره ${phoneNumber} ارسال شد`);
      return res.status(200).json({ success: true, message: 'Code sent successfully' });
    } else {
      console.log('❌ خطا در ارسال کد تایید');
      return res.status(500).json({ success: false, error: 'Error sending verification code' });
    }
  } catch (error) {
    console.error('❌ خطا در ارتباط با API Textbelt:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

// تایید شماره تلفن
router.post('/verify-code', async (req, res) => {
  const { phoneNumber, code } = req.body;

  if (!phoneNumber || !code) {
    return res.status(400).json({ success: false, error: 'Phone number and code are required' });
  }

  try {
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    if (user.verificationCode !== code) {
      return res.status(400).json({ success: false, error: 'Invalid code' });
    }

    user.isVerified = true;
    await user.save();

    return res.status(200).json({ success: true, message: 'Phone number verified' });
  } catch (error) {
    console.error('❌ خطا در تایید شماره تلفن:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;
