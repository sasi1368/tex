const express = require("express");
const router = express.Router();
const axios = require("axios");
const User = require("../models/User");

// ارسال کد
router.post("/send-code", async (req, res) => {
  const { phone } = req.body;
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    const response = await axios.post("https://textbelt.com/text", {
      phone,
      message: `Your login code is: ${code}`,
      key: process.env.TEXTBELT_API_KEY,
    });

    if (response.data.success) {
      await User.findOneAndUpdate({ phone }, { code }, { upsert: true });
      res.json({ success: true });
    } else {
      res.status(400).json({ error: "SMS failed" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// تایید کد
router.post("/verify-code", async (req, res) => {
  const { phone, code } = req.body;
  const user = await User.findOne({ phone });

  if (user && user.code === code) {
    res.json({ success: true, user });
  } else {
    res.status(400).json({ error: "Invalid code" });
  }
});

module.exports = router;
