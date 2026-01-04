
const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const logInForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const passwordInput = document.querySelector('#password');
const buttonOut = document.querySelector('.button-out');
const userName = document.querySelector('.user-name');


function openModalAuth() {
  modalAuth.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  loginInput.style.border = '';
  passwordInput.style.border = '';
}

function closeModalAuthWindow() {
  modalAuth.classList.remove('is-open');
  document.body.style.overflow = '';
}

modalAuth.addEventListener('click', (event) => {
  if (!event.target.closest('.modal-dialog-auth')) {
    closeModalAuthWindow();
  }
});


function logIn(event) {
  event.preventDefault();

  const login = loginInput.value.trim();
  const password = passwordInput.value.trim();
  let valid = true;

  if (!login) {
    loginInput.style.border = '2px solid red';
    valid = false;
  }

  if (!password) {
    passwordInput.style.border = '2px solid red';
    valid = false;
  }

  if (!valid) return;

  localStorage.setItem('user', login);
  checkAuth();
  closeModalAuthWindow();
  logInForm.reset();
}

function logOut() {
  localStorage.removeItem('user');
  checkAuth();
}

function checkAuth() {
  const user = localStorage.getItem('user');

  if (user) {
    userName.textContent = user;
    userName.style.display = 'inline';
    buttonAuth.style.display = 'none';
    buttonOut.style.display = 'block';
  } else {
    userName.style.display = 'none';
    buttonAuth.style.display = 'block';
    buttonOut.style.display = 'none';
  }
}


buttonAuth.addEventListener('click', openModalAuth);
closeAuth.addEventListener('click', closeModalAuthWindow);
logInForm.addEventListener('submit', logIn);
buttonOut.addEventListener('click', logOut);


const restaurants = [
  {
    image: 'img/pizza-plus/preview.jpg',
    name: 'Піца плюс',
    time: '50 хвилин',
    rating: '4.5',
    price: 'від 200 ₴',
    category: 'Піца'
  },
  {
    image: 'img/tanuki/preview.jpg',
    name: 'Танукі',
    time: '60 хвилин',
    rating: '4.5',
    price: 'від 1200 ₴',
    category: 'Суші, роли'
  },
  {
    image: 'img/food-band/preview.jpg',
    name: 'FoodBand',
    time: '40 хвилин',
    rating: '4.5',
    price: 'від 150 ₴',
    category: 'Піца'
  },
  {
    image: 'img/palki-skalki/preview.jpg',
    name: 'Ikigai',
    time: '55 хвилин',
    rating: '4.5',
    price: 'від 250 ₴',
    category: 'Піца'
  },
  {
    image: 'img/gusi-lebedi/preview.jpg',
    name: 'Пузата хата',
    time: '75 хвилин',
    rating: '4.5',
    price: 'від 300 ₴',
    category: 'Українські страви'
  },
  {
    image: 'img/pizza-burger/preview.jpg',
    name: 'PizzaBurger',
    time: '45 хвилин',
    rating: '4.5',
    price: 'від 700 ₴',
    category: 'Піца'
  }
];


const cardsContainer = document.querySelector('.cards-restaurants');

function renderCards() {
  cardsContainer.innerHTML = '';

  restaurants.forEach(item => {
    const card = document.createElement('a');
    card.href = 'restaurant.html';
    card.className = 'card card-restaurant';
   
    card.dataset.products = item.name;

    card.innerHTML = `
      <img src="${item.image}" class="card-image">
      <div class="card-text">
        <div class="card-heading">
          <h3 class="card-title">${item.name}</h3>
          <span class="card-tag tag">${item.time}</span>
        </div>
        <div class="card-info">
          <div class="rating">⭐ ${item.rating}</div>
          <div class="price">${item.price}</div>
          <div class="category">${item.category}</div>
        </div>
      </div>
    `;

    card.addEventListener('click', (event) => {
      
      if (!localStorage.getItem('user')) {
        event.preventDefault();
        openModalAuth();
      } else {
        
        localStorage.setItem('restaurant', item.name);
      }
    });

    cardsContainer.append(card);
  });
}


checkAuth();
renderCards();
