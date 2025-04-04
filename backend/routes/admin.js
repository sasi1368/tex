const express = require('express');
const router = express.Router();
const User = require('../models/User');

// گرفتن اطلاعات کاربران
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({ success: true, users });
  } catch (error) {
    console.error('❌ خطا در دریافت اطلاعات کاربران:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;
