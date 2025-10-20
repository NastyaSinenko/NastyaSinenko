const logs = [
  '[ПЕРСОНАЖ №1] вспомнил что-то важное, но неожиданно [ПЕРСОНАЖ №2], не помня себя от испуга, ударил в предплечье врага.',
  '[ПЕРСОНАЖ №1] поперхнулся, и за это [ПЕРСОНАЖ №2] с испугу приложил прямой удар коленом в лоб врага.',
  '[ПЕРСОНАЖ №1] забылся, но в это время наглый [ПЕРСОНАЖ №2], приняв волевое решение, неслышно подойдя сзади, ударил.',
  '[ПЕРСОНАЖ №1] пришел в себя, но неожиданно [ПЕРСОНАЖ №2] случайно нанес мощнейший удар.',
  '[ПЕРСОНАЖ №1] поперхнулся, но в это время [ПЕРСОНАЖ №2] нехотя раздробил кулаком <вырезанно цензурой> противника.',
  '[ПЕРСОНАЖ №1] удивился, а [ПЕРСОНАЖ №2] пошатнувшись влепил подлый удар.',
  '[ПЕРСОНАЖ №1] высморкался, но неожиданно [ПЕРСОНАЖ №2] провел дробящий удар.',
  '[ПЕРСОНАЖ №1] пошатнулся, и внезапно наглый [ПЕРСОНАЖ №2] беспричинно ударил в ногу противника',
  '[ПЕРСОНАЖ №1] расстроился, как вдруг, неожиданно [ПЕРСОНАЖ №2] случайно влепил стопой в живот соперника.',
  '[ПЕРСОНАЖ №1] пытался что-то сказать, но вдруг, неожиданно [ПЕРСОНАЖ №2] со скуки, разбил бровь сопернику.'
];

// Функція для отримання випадкового лог рядка
function getRandomLog(firstPerson, secondPerson, damage, remainingHp) {
  const randomIndex = Math.floor(Math.random() * logs.length);
  const log = logs[randomIndex]
    .replace('[ПЕРСОНАЖ №1]', firstPerson)
    .replace('[ПЕРСОНАЖ №2]', secondPerson);
  return `${log} 💥 Завдано шкоди: ${damage}. Залишилось HP: ${remainingHp}.`;
}

// Створюємо div для логів
const $logs = document.createElement('div');
$logs.id = 'logs';
document.querySelector('.playground').after($logs);

// Клас Pokemon
class Pokemon {
  constructor(name, selector) {
    this.name = name;
    this.maxHp = 100;
    this.hp = this.maxHp;
    this.selector = selector;
  }

  renderHP() {
    const healthText = document.getElementById(`health-${this.selector}`);
    const progressbar = document.getElementById(`progressbar-${this.selector}`);
    const { hp, maxHp } = this;

    healthText.textContent = `${hp} / ${maxHp}`;
    progressbar.style.width = `${(hp / maxHp) * 100}%`;

    progressbar.classList.remove('low', 'critical');
    if (hp / maxHp <= 0.2) progressbar.classList.add('critical');
    else if (hp / maxHp <= 0.5) progressbar.classList.add('low');
  }

  changeHp(damage) {
    this.hp = Math.max(this.hp - damage, 0);
    this.renderHP();
    if (this.hp === 0) {
      alert(`${this.name} програв!`);
    }
  }

  attack(enemy, maxDamage, minDamage = 5) {
    const damage = Math.floor(Math.random() * (maxDamage - minDamage + 1)) + minDamage;

    const { name: attackerName } = this;
    const { name: enemyName, hp: enemyHp } = enemy;

    const remainingHp = Math.max(enemyHp - damage, 0);
    const logMessage = getRandomLog(enemyName, attackerName, damage, remainingHp);

    addLog(logMessage);
    enemy.changeHp(damage);
  }
}

// Функція для виведення логів у DOM (останній зверху)
function addLog(message) {
  const $p = document.createElement('p');
  $p.textContent = message;
  $logs.prepend($p);
}

// --- Ініціалізація гравців ---
const player1 = new Pokemon('Pikachu', 'character');
const player2 = new Pokemon('Charmander', 'enemy');

player1.renderHP();
player2.renderHP();

// --- Функція-замикання для підрахунку кліків, обмеження і оновлення кнопки ---
const createClickCounter = (maxClicks, $button, label) => {
  let count = 0;

  // Початковий текст кнопки
  $button.textContent = `${label} (${maxClicks} залишилось)`;

  return () => {
    count++;
    const remaining = maxClicks - count;

    if (remaining >= 0) {
      $button.textContent = `${label} (${remaining} залишилось)`;
      console.log(`Кнопка "${label}" натиснута ${count} раз(и). Залишилось: ${remaining}`);
    }

    if (remaining <= 0) {
      $button.disabled = true;
      $button.textContent = `${label} (Вичерпано)`;
      console.log(`Кнопка "${label}" більше не активна!`);
      return false;
    }
    return true;
  };
};

// --- Кнопка Kick ---
const $btnKick = document.getElementById('btn-kick');

// --- Кнопка Special Attack ---
const $btnSpecial = document.createElement('button');
$btnSpecial.classList.add('button');
document.querySelector('.control').appendChild($btnSpecial);

// --- Створюємо лічильники для кнопок (із замиканням) ---
const kickCounter = createClickCounter(6, $btnKick, 'Kick');
const specialCounter = createClickCounter(6, $btnSpecial, 'Special Attack');

// --- Обробники подій для кнопок ---
$btnKick.addEventListener('click', () => {
  if (kickCounter()) {
    player1.attack(player2, 20, 5);
    if (player2.hp > 0) player2.attack(player1, 20, 5);
  }
});

$btnSpecial.addEventListener('click', () => {
  if (specialCounter()) {
    player1.attack(player2, 40, 15);
    if (player2.hp > 0) player2.attack(player1, 20, 5);
  }
});