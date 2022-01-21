let button = document.getElementById('loginBtn');

if (button != null) {
    button.addEventListener('click', (e)  => {
        window.location.href = '/login';
    });
}
