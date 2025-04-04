document.getElementById('sendCodeBtn')?.addEventListener('click', async () => {
  const phone = document.getElementById('phoneInput')?.value;
  console.log('📲 شماره وارد شده:', phone);

  try {
    const res = await fetch('/api/auth/send-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone }),
    });

    const data = await res.json(); // اگر پاسخ خالی یا HTML باشه اینجا خطا میده
    console.log('✅ پاسخ از سرور:', data);

    if (data.success) {
      alert('کد با موفقیت ارسال شد');
    } else {
      alert('❌ ارسال کد با خطا مواجه شد: ' + (data.error || 'خطای نامشخص'));
    }
  } catch (error) {
    console.error('❌ ارسال کد خطا داد:', error);
    alert('خطا در ارتباط با سرور');
  }
});
