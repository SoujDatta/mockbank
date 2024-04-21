document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registration-form');
  const loginForm = document.getElementById('login-form');
  const errorMessage = document.querySelector('.error-message');
  const accountSummary = document.getElementById('account-summary');
  const welcomeName = document.getElementById('welcome-name');
  const switchToRegister = document.getElementById('switch-to-register');

  // Function to store user data in local storage
  function storeUserData(username, password) {
    const userData = { username, password, accountType: 'Checking (Mock)', accountBalance: 1000.00 };
    localStorage.setItem('userData', JSON.stringify(userData));
  }

  // Function to retrieve user data from local storage
  function retrieveUserData() {
    const userDataJSON = localStorage.getItem('userData');
    if (userDataJSON) {
      const userData = JSON.parse(userDataJSON);
      welcomeName.textContent = userData.username;
      document.getElementById('account-type').textContent = userData.accountType;
      document.getElementById('account-balance').textContent = `$${userData.accountBalance.toFixed(2)}`;
      accountSummary.style.display = 'block';
    }
  }

  // Handle form switching between register and login
  switchToRegister.addEventListener('click', function(event) {
    event.preventDefault();
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
    errorMessage.textContent = '';
  });

  // Handle registration form submission
  registerForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
      errorMessage.textContent = 'Passwords do not match';
      return;
    }

    storeUserData(username, password);
    retrieveUserData();
    registerForm.reset();

    // Switch to login form after successful registration
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
  });

  // Handle login form submission
  loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const userDataJSON = localStorage.getItem('userData');
    if (userDataJSON) {
      const userData = JSON.parse(userDataJSON);
      if (username === userData.username && password === userData.password) {
        errorMessage.textContent = '';
        retrieveUserData();
        loginForm.reset();
      } else {
        errorMessage.textContent = 'Invalid username or password';
      }
    } else {
      errorMessage.textContent = 'No account registered';
    }
  });

  // Check if user is already logged in
  if (localStorage.getItem('userData')) {
    retrieveUserData();
  } else {
    loginForm.style.display = 'block';
  }
});






