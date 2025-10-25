import { Pokemon } from './pokemon.js';

const { player1, player2 } = Pokemon.createBattle();

// --- Функция-замикання для підрахунку кліків ---
const createClickCounter = (maxClicks, $button, label) => {
  let count = 0;
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

// --- Лічильники ---
const kickCounter = createClickCounter(6, $btnKick, 'Kick');
const specialCounter = createClickCounter(6, $btnSpecial, 'Special Attack');

// --- Події ---
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