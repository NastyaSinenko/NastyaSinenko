const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const logInForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const buttonOut = document.querySelector('.button-out');
const userName = document.querySelector('.user-name');

// --- ФУНКЦІЇ ---

function openModalAuth() {
    modalAuth.classList.add('is-open');

    // прибираємо смугу прокрутки у body
    document.body.style.overflow = 'hidden';

    // при повторному відкритті обнуляємо рамки полів
    loginInput.style.border = '';
    document.querySelector('#password').style.border = '';
}

// закрити модальне вікно
function closeModalAuthWindow() {
    modalAuth.classList.remove('is-open');

    // повертаємо смугу прокрутки
    document.body.style.overflow = '';
}

// --- ОБРОБНИК ЗАКРИТТЯ ПО КЛІКУ ЗА МЕЖАМИ ---
modalAuth.addEventListener('click', (event) => {
    // якщо клікнули не по діалоговому вікну
    if (!event.target.closest('.modal-dialog-auth')) {
        closeModalAuthWindow();
    }
});

// --- ФОРМА ЛОГІН ---
function logIn(event) {
    event.preventDefault();

    const login = loginInput.value.trim();
    const passwordInput = document.querySelector('#password');
    const password = passwordInput.value.trim();

    let valid = true;

    // перевірка логіну
    if (!login) {
        loginInput.style.border = '2px solid red';
        valid = false;
    } else {
        loginInput.style.border = '';
    }

    // перевірка паролю
    if (!password) {
        passwordInput.style.border = '2px solid red';
        valid = false;
    } else {
        passwordInput.style.border = '';
    }

    if (!valid) return;

    // зберегти логін у localStorage
    localStorage.setItem('user', login);

    // відобразити логін
    userName.textContent = login;
    userName.style.display = 'inline';

    buttonAuth.style.display = 'none';
    buttonOut.style.display = 'block';

    closeModalAuthWindow();
    logInForm.reset();
}

// --- ОБРОБНИКИ ---
buttonAuth.addEventListener('click', openModalAuth);
closeAuth.addEventListener('click', closeModalAuthWindow);
logInForm.addEventListener('submit', logIn);
buttonOut.addEventListener('click', logOut);
