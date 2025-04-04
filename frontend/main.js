const api = "https://your-backend-url.onrender.com/api";

async function sendCode() {
  const phone = document.getElementById("phone").value;
  await fetch(`${api}/auth/send-code`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone })
  });
}

async function verifyCode() {
  const phone = document.getElementById("phone").value;
  const code = document.getElementById("code").value;
  const res = await fetch(`${api}/auth/verify-code`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone, code })
  });
  const data = await res.json();
  if (data.success) {
    localStorage.setItem("userPhone", phone);
    window.location.href = "dashboard.html";
  } else {
    alert("Wrong code");
  }
}
