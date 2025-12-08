const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const logInForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const buttonOut = document.querySelector('.button-out');
const userName = document.querySelector('.user-name');


// --- ФУНКЦІЇ ---

// показати модальне вікно
function openModalAuth() {
    modalAuth.classList.add('is-open');
}

// закрити модальне вікно
function closeModalAuthWindow() {
    modalAuth.classList.remove('is-open');
}

// авторизація
function logIn(event) {
    event.preventDefault();

    const login = loginInput.value.trim();

    // якщо логін порожній — показати помилку
    if (!login) {
        loginInput.style.border = '2px solid red';
        return;
    }

    // прибрати червону рамку (якщо була)
    loginInput.style.border = '';

    // зберегти логін у localStorage
    localStorage.setItem('user', login);

    // відобразити логін біля кнопки
    userName.textContent = login;
    userName.style.display = 'inline';

    // сховати кнопку "Увійти", показати "Вийти"
    buttonAuth.style.display = 'none';
    buttonOut.style.display = 'block';

    // закрити модальне вікно
    closeModalAuthWindow();

    // очистити форму
    logInForm.reset();
}


// вихід
function logOut() {
    // видалити логін із localStorage
    localStorage.removeItem('user');

    // очистити відображення імені
    userName.textContent = '';
    userName.style.display = 'none';

    // перемикаємо кнопки назад
    buttonAuth.style.display = 'block';
    buttonOut.style.display = 'none';

    // очистити поле логіну
    loginInput.value = '';
}


// --- ПЕРЕВІРКА АВТОРИЗАЦІЇ ПРИ ЗАВАНТАЖЕННІ СТОРІНКИ ---
function checkAuth() {
    const savedLogin = localStorage.getItem('user');

    if (savedLogin) {
        userName.textContent = savedLogin;
        userName.style.display = 'inline';

        buttonAuth.style.display = 'none';
        buttonOut.style.display = 'block';
    } else {
        buttonAuth.style.display = 'block';
        buttonOut.style.display = 'none';
    }
}

checkAuth();


// --- ОБРОБНИКИ ПОДІЙ ---
buttonAuth.addEventListener('click', openModalAuth);
closeAuth.addEventListener('click', closeModalAuthWindow);
logInForm.addEventListener('submit', logIn);
buttonOut.addEventListener('click', logOut);