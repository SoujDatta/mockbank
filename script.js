document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('register-form');
  const loginForm = document.getElementById('login-form');
  const errorMessage = document.querySelector('.error-message');
  const accountSummary = document.getElementById('account-summary');
  const welcomeName = document.getElementById('welcome-name');
  const switchToRegister = document.getElementById('switch-to-register');

  console.log('Script loaded');

  // Function to store user data in local storage
  function storeUserData(username, password) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const userData = { id: Date.now(), username, password, accountType: 'Checking (Mock)', accountBalance: 1000.00 };
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
    console.log('User registered:', userData);
  }

  // Function to retrieve user data from local storage
  function retrieveUserData(username) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userData = users.find(user => user.username === username);
    if (userData) {
      welcomeName.textContent = userData.username;
      document.getElementById('account-type').textContent = userData.accountType;
      document.getElementById('account-balance').textContent = `$${userData.accountBalance.toFixed(2)}`;
      accountSummary.style.display = 'block';
      console.log('User data retrieved:', userData);
    }
  }

  // Handle form switching between register and login
  switchToRegister.addEventListener('click', function(event) {
    event.preventDefault();
    console.log('Switching to registration form');
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
    errorMessage.textContent = '';
  });

  // Handle registration form submission
  registerForm.addEventListener('submit', function(event) {
    event.preventDefault();
    console.log('Registration form submitted');

    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('confirm-register-password').value;

    if (password !== confirmPassword) {
      errorMessage.textContent = 'Passwords do not match';
      console.log('Passwords do not match');
      return;
    }

    storeUserData(username, password);
    retrieveUserData(username);
    registerForm.reset();

    // Switch to login form after successful registration
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
  });

  // Handle login form submission
  loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    console.log('Login form submitted');

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userData = users.find(user => user.username === username && user.password === password);

    if (userData) {
      errorMessage.textContent = '';
      retrieveUserData(username);
      loginForm.reset();
      console.log('User logged in:', userData);
    } else {
      errorMessage.textContent = 'Invalid username or password';
      console.log('Invalid username or password');
    }
  });

  // Check if user is already logged in
  if (localStorage.getItem('users')) {
    loginForm.style.display = 'block';
  } else {
    loginForm.style.display = 'block';
  }
});
