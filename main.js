class Pokemon {
    constructor(name, selector) {
        this.name = name;
        this.maxHp = 100;
        this.hp = this.maxHp;
        this.selector = selector;
    }

    
    changeHp(damage) {
        this.hp = Math.max(this.hp - damage, 0);
        this.renderHP();
        if (this.hp === 0) {
            alert(this.name + " програв!");
        }
    }

    renderHP() {
        const healthText = document.getElementById(`health-${this.selector}`);
        const progressbar = document.getElementById(`progressbar-${this.selector}`);
        healthText.textContent = `${this.hp} / ${this.maxHp}`;
        progressbar.style.width = (this.hp / this.maxHp * 100) + "%";

       
        progressbar.classList.remove("low", "critical");
        if (this.hp / this.maxHp <= 0.2) {
            progressbar.classList.add("critical");
        } else if (this.hp / this.maxHp <= 0.5) {
            progressbar.classList.add("low");
        }
    }
}


const player1 = new Pokemon("Pikachu", "character");
const player2 = new Pokemon("Charmander", "enemy");


player1.renderHP();
player2.renderHP();


function attack(attacker, defender, maxDamage, minDamage = 5) {
    const damage = Math.floor(Math.random() * (maxDamage - minDamage + 1)) + minDamage;
    console.log(`${attacker.name} атакує ${defender.name} і завдає ${damage} шкоди!`);
    defender.changeHp(damage);
}


const $btnKick = document.getElementById("btn-kick");


$btnKick.addEventListener("click", function () {
    attack(player1, player2, 20, 5);
    if (player2.hp > 0) {
        attack(player2, player1, 20, 5);
    }
});


const $btnSpecial = document.createElement("button");
$btnSpecial.classList.add("button");
$btnSpecial.textContent = "Special Attack";
document.querySelector(".control").appendChild($btnSpecial);

$btnSpecial.addEventListener("click", function () {
    attack(player1, player2, 40, 15);
    if (player2.hp > 0) {
        attack(player2, player1, 20, 5);
    }
});