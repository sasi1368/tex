document.addEventListener('DOMContentLoaded', () => {
  const sendBtn = document.getElementById('sendCodeBtn');
  const verifyBtn = document.getElementById('verifyCodeBtn');

  sendBtn?.addEventListener('click', async () => {
    const phone = document.getElementById('phone').value;
    if (!phone) {
      alert("لطفاً شماره تلفن را وارد کنید.");
      return;
    }

    try {
      const res = await fetch('/api/auth/send-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ phone })
      });

      const data = await res.json();
      if (data.success) {
        alert('کد ارسال شد!');
      } else {
        alert('ارسال کد ناموفق بود: ' + (data.error || 'خطای نامشخص'));
      }
    } catch (err) {
      console.error('ارسال کد خطا داد:', err);
      alert('مشکلی در ارتباط با سرور پیش آمد.');
    }
  });

  verifyBtn?.addEventListener('click', async () => {
    const phone = document.getElementById('phone').value;
    const code = document.getElementById('code').value;
    if (!phone || !code) {
      alert("شماره تلفن و کد را وارد کنید.");
      return;
    }

    try {
      const res = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ phone, code })
      });

      const data = await res.json();
      if (data.success) {
        alert('ورود موفق!');
        window.location.href = '/dashboard.html';
      } else {
        alert('کد اشتباه است.');
      }
    } catch (err) {
      console.error('خطای بررسی کد:', err);
      alert('بررسی کد با خطا مواجه شد.');
    }
  });
});
