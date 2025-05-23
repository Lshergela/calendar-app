function changeTab(tabId) {
  let i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName('tabcontent');
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = 'none';
  }

  tablinks = document.getElementsByClassName('tablinks');
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(' active', '');
  }

  document.getElementById(tabId).style.display = 'flex';
  document.getElementById(`${tabId}Button`).className += ' active';
}

document.addEventListener('DOMContentLoaded', function () {
  const signInButton = document.getElementById('signInButton');
  const registrationButton = document.getElementById('registrationButton');
  const signInForm = document.getElementById('signInForm');
  const registrationForm = document.getElementById('registrationForm');
  const passwordInput = document.getElementById('passwordInput');
  const passwordCheck = document.getElementById('passwordCheck');
  const registrationPasswordInput = document.getElementById(
    'registrationPasswordInput'
  );
  const registrationPasswordCheck = document.getElementById(
    'registrationPasswordCheck'
  );

  registrationPasswordCheck.addEventListener('click', () => {
    if (registrationPasswordInput.type === 'password') {
      registrationPasswordInput.type = 'text';
    } else {
      registrationPasswordInput.type = 'password';
    }
  });

  passwordCheck.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
  });

  signInButton.addEventListener('click', (e) => {
    changeTab('signIn');
  });

  registrationButton.addEventListener('click', (e) => {
    changeTab('registration');
  });

  signInForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.target).entries());

    try {
      const response = await axios.post(
        'https://dentini-calendar-3ac858824eb1.herokuapp.com/api/auth/login',
        formData
      );

      const user = {
        name: response.data.user.name,
        email: response.data.user.email,
      };

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', response.data.token);

      window.location.href = '/index.html';
    } catch (error) {
      console.error('Error:', error);
    }
  });

  registrationForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.target).entries());

    try {
      await axios.post(
        'https://dentini-calendar-3ac858824eb1.herokuapp.com/api/auth/register',
        formData
      );

      changeTab('signIn');
    } catch (error) {
      console.error('Error:', error);
    }
  });
});
