
import { getRandomLog } from './logs.js';

export class Pokemon {
  constructor(name, selector, img) {
    this.name = name;
    this.maxHp = 100;
    this.hp = this.maxHp;
    this.selector = selector;
    this.attacks = [];

    
    const $img = document.querySelector(`.${selector} .sprite`);
    if ($img && img) $img.src = img;

   
    const $name = document.getElementById(`name-${selector}`);
    if ($name) $name.textContent = this.name;

    
    if (!document.getElementById('logs')) {
      const $logs = document.createElement('div');
      $logs.id = 'logs';
      document.querySelector('.playground').after($logs);
    }
  }

  renderHP() {
    const healthText = document.getElementById(`health-${this.selector}`);
    const progressbar = document.getElementById(`progressbar-${this.selector}`);
    const { hp, maxHp } = this;

    if (healthText) healthText.textContent = `${hp} / ${maxHp}`;
    if (progressbar) progressbar.style.width = `${(hp / maxHp) * 100}%`;

    if (progressbar) {
      progressbar.classList.remove('low', 'critical');
      if (hp / maxHp <= 0.2) progressbar.classList.add('critical');
      else if (hp / maxHp <= 0.5) progressbar.classList.add('low');
    }
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

    this.addLog(logMessage);
    enemy.changeHp(damage);
  }

  addLog(message) {
    const $logs = document.getElementById('logs');
    if (!$logs) return;
    const $p = document.createElement('p');
    $p.textContent = message;
    $logs.prepend($p);
  }
}