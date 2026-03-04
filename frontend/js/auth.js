import { register, login } from './api.js';

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const submitBtn = document.getElementById('submitBtn');
const message = document.getElementById('message');
const formTitle = document.getElementById('formTitle');

const isLoginPage = window.location.pathname.includes('login.html');
const isRegisterPage = window.location.pathname.includes('register.html');

if (isLoginPage) {
  formTitle.textContent = 'Login';
  submitBtn.textContent = 'Login';
  document.getElementById('registerLink').style.display = 'block';
} else if (isRegisterPage) {
  formTitle.textContent = 'Register';
  submitBtn.textContent = 'Register';
  document.getElementById('loginLink').style.display = 'block';
}

submitBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  message.textContent = '';
  message.className = 'message';

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    message.textContent = 'Please fill in all fields';
    message.className = 'message error';
    return;
  }

  try {
    submitBtn.disabled = true;
    let result;

    if (isLoginPage) {
      result = await login(email, password);
    } else if (isRegisterPage) {
      result = await register(email, password);
    }

    localStorage.setItem('token', result.token);
    localStorage.setItem('user_role', result.user.role);
    localStorage.setItem('user_email', result.user.email);

    message.textContent = isLoginPage ? 'Login successful!' : 'Registration successful!';
    message.className = 'message success';

    setTimeout(() => {
      window.location.href = 'games.html';
    }, 1000);
  } catch (error) {
    message.textContent = error.message;
    message.className = 'message error';
  } finally {
    submitBtn.disabled = false;
  }
});
