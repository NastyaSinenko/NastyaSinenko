
import { pokemons } from './pokemons.js';
import { Pokemon } from './pokemon.js';

const createClickCounter = (maxClicks, $button, label) => {
  let count = 0;
  $button.textContent = `${label} (${maxClicks})`;
  return () => {
    count++;
    const remaining = maxClicks - count;
    $button.textContent = `${label} (${remaining})`;
    if (remaining <= 0) {
      $button.disabled = true;
      $button.textContent = `${label} (0)`;
      return false;
    }
    return true;
  };
};

class Game {
  constructor() {
    this.player1 = null;
    this.player2 = null;
    this.$control = document.querySelector('.control');
  }

  getRandomPokemon() {
    return pokemons[Math.floor(Math.random() * pokemons.length)];
  }

  createPlayers() {
    const p1Data = this.getRandomPokemon();
    let p2Data = this.getRandomPokemon();
    while (p2Data === p1Data) {
      p2Data = this.getRandomPokemon();
    }

    this.player1 = new Pokemon(p1Data.name, 'player1', p1Data.img);
    this.player2 = new Pokemon(p2Data.name, 'player2', p2Data.img);

    Object.assign(this.player1, { attacks: p1Data.attacks || [] });
    Object.assign(this.player2, { attacks: p2Data.attacks || [] });

    this.player1.renderHP();
    this.player2.renderHP();
  }

  createAttackButtons() {
    this.$control.querySelectorAll('.button').forEach(b => b.remove());

    this.player1.attacks.forEach(attack => {
      const $button = document.createElement('button');
      $button.classList.add('button');
      this.$control.appendChild($button);

      const counter = createClickCounter(attack.maxCount, $button, attack.name);

      $button.addEventListener('click', () => {
        if (!counter()) return;

        this.player1.attack(this.player2, attack.maxDamage, attack.minDamage);

        if (this.player2.hp > 0) {
          const enemyAttack = this.player2.attacks[
            Math.floor(Math.random() * this.player2.attacks.length)
          ];
          this.player2.attack(this.player1, enemyAttack.maxDamage, enemyAttack.minDamage);
        } else {
          alert(`${this.player1.name} переміг!`);
          this.endBattle();
        }

        if (this.player1.hp === 0) {
          alert(`${this.player2.name} переміг!`);
          this.endBattle();
        }
      });
    });
  }

  endBattle() {
    this.$control.querySelectorAll('.button').forEach(b => (b.disabled = true));
    // Показуємо Reset Game після бою
    this.showResetButton();
  }

  showResetButton() {
    const $resetBtn = document.createElement('button');
    $resetBtn.classList.add('button');
    $resetBtn.textContent = 'RESET GAME';
    this.$control.appendChild($resetBtn);

    $resetBtn.addEventListener('click', () => {
      this.resetGame();
    });
  }

  resetGame() {
    const $logs = document.getElementById('logs');
    if ($logs) $logs.innerHTML = '';
    this.createPlayers();
    this.createAttackButtons();
  }

  startGame() {
    
    this.$control.innerHTML = '';
    const $startBtn = document.createElement('button');
    $startBtn.classList.add('button');
    $startBtn.textContent = 'START GAME';
    this.$control.appendChild($startBtn);

    $startBtn.addEventListener('click', () => {
      this.resetGame();
      $startBtn.remove(); 
    });
  }
}

const game = new Game();
game.startGame();