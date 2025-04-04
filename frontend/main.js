document.getElementById('send-code-btn').addEventListener('click', function() {
  const phone = document.getElementById('phone-input').value;

  // ارسال شماره تلفن برای دریافت کد تایید
  fetch('/api/auth/send-code', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone }),
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      alert('Code sent successfully!');
    } else {
      alert('Error sending code.');
    }
  })
  .catch(err => console.error('Error:', err));
});

document.getElementById('verify-code-btn').addEventListener('click', function() {
  const phone = document.getElementById('phone-input').value;
  const code = document.getElementById('code-input').value;

  // ارسال شماره تلفن و کد تایید برای بررسی
  fetch('/api/auth/verify-code', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone, code }),
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      alert('Phone number verified!');
      window.location.href = '/dashboard.html';  // هدایت به داشبورد
    } else {
      alert('Invalid code.');
    }
  })
  .catch(err => console.error('Error:', err));
});
