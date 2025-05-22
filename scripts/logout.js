export function logout() {
  const user = JSON.parse(localStorage.getItem('user'));
  const username = document.getElementById('userName');
  const logoutButton = document.getElementById('logoutButton');
  const mobileUsername = document.getElementById('mobileUserName');
  const mobileLogoutButton = document.getElementById('mobileLogoutButton');

  username.innerHTML = user.name;
  mobileUsername.innerHTML = user.name;

  logoutButton.addEventListener('click', () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    window.location.href = '/auth.html';
  });

  mobileLogoutButton.addEventListener('click', () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    window.location.href = '/auth.html';
  });
}
