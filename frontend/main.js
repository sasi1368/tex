document.getElementById('sendCodeBtn').addEventListener('click', async () => {
  const phone = document.getElementById('phone').value;

  const response = await fetch('/api/auth/send-code', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ phone }),
  });

  const result = await response.json();

  if (result.success) {
    alert('Verification code sent!');
  } else {
    alert('Failed to send code: ' + result.error);
  }
});
