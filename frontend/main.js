document.getElementById('sendCodeButton').addEventListener('click', async () => {
  const phoneNumber = document.getElementById('phoneNumber').value;
  console.log(`📲 شماره وارد شده: ${phoneNumber}`);

  if (!phoneNumber) {
    alert('Please enter a phone number');
    return;
  }

  try {
    const response = await fetch('/api/auth/send-code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phoneNumber }),
    });

    const data = await response.json();
    console.log('✅ پاسخ از سرور:', data);

    if (data.success) {
      alert('Code sent successfully');
    } else {
      alert(`Error: ${data.error}`);
    }
  } catch (error) {
    console.error('❌ ارسال کد خطا داد:', error);
    alert('Error sending code');
  }
});

document.getElementById('verifyCodeButton').addEventListener('click', async () => {
  const phoneNumber = document.getElementById('phoneNumber').value;
  const code = document.getElementById('verificationCode').value;

  if (!phoneNumber || !code) {
    alert('Please enter both phone number and code');
    return;
  }

  try {
    const response = await fetch('/api/auth/verify-code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phoneNumber, code }),
    });

    const data = await response.json();

    if (data.success) {
      alert('Phone number verified');
    } else {
      alert(`Error: ${data.error}`);
    }
  } catch (error) {
    console.error('❌ خطا در تایید کد:', error);
    alert('Error verifying code');
  }
});
