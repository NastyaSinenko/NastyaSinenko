const cardsMenu = document.querySelector('.cards-menu');
const restaurantTitle = document.querySelector('.restaurant-title');
const rating = document.querySelector('.rating');
const price = document.querySelector('.price');
const category = document.querySelector('.category');


const menus = {
  'Піца плюс': [
    { name:'Піца Везувій', image:'img/pizza-plus/pizza-vesuvius.jpg', description:'Соус томатний, сир Моцарелла, шинка, пепероні, халапеньйо', price:545 },
    { name:'Піца BBQ', image:'img/pizza-plus/pizza-girls.jpg', description:'Томатний соус, сир, кукурудза, гриби, болгарський перець', price:150 },
    { name:'Піца Оле-Оле', image:'img/pizza-plus/pizza-oleole.jpg', description:'Соус томатний, моцарелла, черрі, маслини, зелень', price:440 },
    { name:'Піца Плюс', image:'img/pizza-plus/pizza-plus.jpg', description:'Моцарелла, чеддер, пепероні, телятина, гриби', price:405 },
    { name:'Піца Гавайська', image:'img/pizza-plus/pizza-hawaiian.jpg', description:'Соус томатний, моцарелла, шинка, ананаси', price:340 },
    { name:'Піца Класика', image:'img/pizza-plus/pizza-classic.jpg', description:'Моцарелла, пармезан, шинка, салямі, гриби', price:310 }
  ],
  'Танукі': [
    { name:'Ажі рол', image:'img/tanuki/azhi.jpg', description:'Тунець, рис, соус понзу, кунжут', price:320 },
    { name:'Блек рол', image:'img/tanuki/black.jpg', description:'Лосось, крем-сир, чорний кунжут', price:340 },
    { name:'Фреш рол', image:'img/tanuki/fresh.jpg', description:'Огірок, авокадо, лосось, рис', price:290 },
    { name:'Нісуаз рол', image:'img/tanuki/nisuaz.jpg', description:'Тунець, яйце, овочі, соус', price:360 },
    { name:'Смоук рол', image:'img/tanuki/smoke.jpg', description:'Копчений лосось, сир, рис', price:370 },
    { name:'Танукі рол', image:'img/tanuki/tanuki.jpg', description:'Фірмовий рол з лососем і сиром', price:390 }
  ],
  'FoodBand': [
    { name:'Маргарита', image:'img/food-band/margarita.jpg', description:'Томатний соус, моцарелла, базилік', price:180 },
    { name:'Міт піца', image:'img/food-band/meet.jpg', description:'М’ясо, моцарелла, томатний соус', price:260 },
    { name:'Норвезька', image:'img/food-band/norwegian.jpg', description:'Лосось, сир, вершковий соус', price:310 },
    { name:'Пепероні', image:'img/food-band/pepperoni.jpg', description:'Пепероні, моцарелла, соус', price:240 },
    { name:'Сім сирів', image:'img/food-band/seven-cheeses.jpg', description:'Суміш 7 сирів, вершковий соус', price:290 },
    { name:'Том Ям піца', image:'img/food-band/tom-yam.jpg', description:'Гострий соус том ям, курка, сир', price:320 }
  ],
  'Ikigai': [
    { name:'Буріто', image:'img/palki-skalki/burrito.jpg', description:'М’ясо, рис, овочі, соус', price:210 },
    { name:'Чізбургер', image:'img/palki-skalki/cheeseburger.jpg', description:'Яловичина, сир, соус', price:190 },
    { name:'Комбо', image:'img/palki-skalki/combo.jpg', description:'Бургер, картопля, соус', price:270 },
    { name:'Ф’южн', image:'img/palki-skalki/fusion.jpg', description:'Азійський мікс, овочі, м’ясо', price:260 },
    { name:'Рим', image:'img/palki-skalki/rome.jpg', description:'Паста, сир, томатний соус', price:230 },
    { name:'Удон', image:'img/palki-skalki/udon.jpg', description:'Локшина удон, курка, овочі', price:220 }
  ],
  'Пузата хата': [
    { name:'Телятина з соусом', image:'img/gusi-lebedi/calf-sauce.jpg', description:'Телятина, підлива, гарнір', price:180 },
    { name:'Курка запечена', image:'img/gusi-lebedi/chick.jpg', description:'Курка, спеції, овочі', price:160 },
    { name:'Курячий суп', image:'img/gusi-lebedi/chicken-soup.jpg', description:'Бульйон, курка, локшина', price:110 },
    { name:'Вареники', image:'img/gusi-lebedi/dumplings.jpg', description:'З картоплею та сметаною', price:140 },
    { name:'Юшка', image:'img/gusi-lebedi/ear.jpg', description:'Рибний суп по-домашньому', price:130 },
    { name:'Свинина', image:'img/gusi-lebedi/pig-chop.jpg', description:'Смажена свинина, гарнір', price:190 },
    { name:'Плов', image:'img/gusi-lebedi/plov.jpg', description:'Рис, м’ясо, спеції', price:170 },
    { name:'Кальмар', image:'img/gusi-lebedi/squid.jpg', description:'Кальмар у соусі', price:200 },
    { name:'Судак', image:'img/gusi-lebedi/zander.jpg', description:'Філе судака, лимон', price:220 }
  ],
  'PizzaBurger': [
    { name:'Цезар піца', image:'img/pizza-burger/pizza-caesar.jpg', description:'Курка, соус цезар, сир', price:260 },
    { name:'Шеф піца', image:'img/pizza-burger/pizza-chef.jpg', description:'Фірмова піца з м’ясом', price:290 },
    { name:'Дачна піца', image:'img/pizza-burger/pizza-dacha.jpg', description:'Овочі, сир, соус', price:240 },
    { name:'М’ясна піца', image:'img/pizza-burger/pizza-meat.jpg', description:'Асорті м’яса, моцарелла', price:310 },
    { name:'Пепероні', image:'img/pizza-burger/pizza-pepperoni.jpg', description:'Пепероні, сир, соус', price:270 },
    { name:'Сільська піца', image:'img/pizza-burger/pizza-village.jpg', description:'Ковбаски, гриби, сир', price:280 }
  ]
};




if (localStorage.getItem('restaurant')) {
  const restaurantName = localStorage.getItem('restaurant');

 
  restaurantTitle.textContent = restaurantName;

 
  const selectedMenu = menus[restaurantName];
  
  
  if (selectedMenu) {
    renderMenu(selectedMenu);
  } else {
    cardsMenu.innerHTML = '<p>Меню для цього ресторану ще не додано :(</p>';
  }

} else {
  
  window.location.href = 'index.html';
}


function renderMenu(menuArray) {
  cardsMenu.innerHTML = '';

  menuArray.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="card-image">
      <div class="card-text">
        <div class="card-heading">
          <h3 class="card-title card-title-reg">${item.name}</h3>
        </div>
        <div class="card-info">
          <div class="ingredients">${item.description}</div>
        </div>
        <div class="card-buttons">
          <button class="button button-primary button-add-cart">
            <span class="button-card-text">У кошик</span>
            <span class="button-cart-svg"></span>
          </button>
          <strong class="card-price-bold">${item.price} ₴</strong>
        </div>
      </div>
    `;

    cardsMenu.append(card);
  });
}