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

    attack(enemy, maxDamage, minDamage = 5) {
        const damage = Math.floor(Math.random() * (maxDamage - minDamage + 1)) + minDamage;
        console.log(`${this.name} атакує ${enemy.name} і завдає ${damage} шкоди!`);
        enemy.changeHp(damage);
    }
}


const player1 = new Pokemon("Pikachu", "character");
const player2 = new Pokemon("Charmander", "enemy");

player1.renderHP();
player2.renderHP();


const $btnKick = document.getElementById("btn-kick");
$btnKick.addEventListener("click", function () {
    player1.attack(player2, 20, 5);
    if (player2.hp > 0) {
        player2.attack(player1, 20, 5);
    }
});

const $btnSpecial = document.createElement("button");
$btnSpecial.classList.add("button");
$btnSpecial.textContent = "Special Attack";
document.querySelector(".control").appendChild($btnSpecial);

$btnSpecial.addEventListener("click", function () {
    player1.attack(player2, 40, 15);
    if (player2.hp > 0) {
        player2.attack(player1, 20, 5);
    }

});
