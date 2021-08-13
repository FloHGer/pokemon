var pokemon1;
var pokemon2;
var pokeDex1 = [];
var pokeDex2 = [];
class Pokemon{
    constructor(ID, maxHealth, maxMana, skills = []){
        this.ID = ID;
        this.name = ID.slice(0, -2);
        this.maxHealth = maxHealth;
        this.health = this.maxHealth;
        this.maxMana = maxMana;
        this.mana = this.maxMana;
        this.skills = skills;        
    }
    learnAttackSkill(attack){
        this.skills.push(attack);
        document.getElementById('info').innerHTML =`${this.name} learned ${attack.attackName}!`;
        resetInfo();
    }
    attack(index, target){
        // possibility checks
        if(this.skills[index] == undefined){
            fightInfo(`This attack doesn't excist!`);
            return resetInfo();
        }
        if(this.health == 0){
            fightInfo(`${this.name} is dead!`);
            return resetInfo();
        }
        if(this.skills[index].cost > this.mana){
            fightInfo(`You don't have enough mana.`);
            return resetInfo();
        }
        if(target.health == 0){
            fightInfo(`Your target is already dead!`);
            return resetInfo();
        }
        // attack message
        fightInfo(`${this.name} attacks  with ${this.skills[index].attackName}!\n\n${target.name} gets ${this.skills[index].dmg}DMG!`);
        resetInfo();
        // attack calculation
        // health
        target.health -= this.skills[index].dmg;
        if(this.ID == pokemon1.ID) document.getElementById('health2').value -= this.skills[index].dmg;
        if(this.ID == pokemon2.ID) document.getElementById('health1').value -= this.skills[index].dmg;
        // mana
        this.mana -= this.skills[index].cost;
        if(this.ID == pokemon1.ID) document.getElementById('mana1').value -= this.skills[index].cost;
        if(this.ID == pokemon2.ID) document.getElementById('mana2').value -= this.skills[index].cost;
        // checks
        if(target.health <= 0){
            target.health = 0;
            if(this.ID == pokemon1.ID){
                document.getElementById('health2').value = 0;
                document.getElementById('pic2').style.visibility = 'hidden';
            }
            if(this.ID == pokemon2.ID){
                document.getElementById('health1').value = 0;
                document.getElementById('pic1').style.visibility = 'hidden';
            }
        }
        if(this.skills[index].dmg >= target.health + this.skills[index].dmg) return document.getElementById('info').innerHTML += `\n\n${target.name} dies!`;
    }
    addHealth(add){
        if(this.health == this.maxHealth){
            fightInfo(`${this.name} is already at max health.`);
            return resetInfo();
        }
        if(this.health == 0){
            fightInfo(`${this.name} is dead.`);
            return resetInfo();
        }
        this.health += add;
        if(this.ID == pokemon1.ID) document.getElementById('health1').value += add;
        if(this.ID == pokemon2.ID) document.getElementById('health2').value += add;
        fightInfo(`${this.name} gains ${add}HP!`);
        return resetInfo();
    }
    addMana(add){
        if(this.mana == this.maxMana){
            fightInfo(`${this.name} is already at max mana.`);
            return resetInfo();
        }
        if(this.mana == 0){
            fightInfo(`${this.name} is dead.`);
            return resetInfo();
        }
        this.mana += add;
        if(this.ID == pokemon1.ID) document.getElementById('mana1').value += add;
        if(this.ID == pokemon2.ID) document.getElementById('mana2').value += add;
        fightInfo(`${this.name} gains ${add}MP!`);
        return resetInfo();
    }
}
class AttackSkill{
    constructor(attackName, dmg, cost){
        this.attackName = attackName;
        this.dmg = dmg;
        this.cost = cost;
    }
}

// CREATION
let thunderShock = new AttackSkill("Thunder Shock", 40, 30);
let earthquake = new AttackSkill ("Earthquake", 50, 40);
let quickAttack = new AttackSkill ("Quick Attack", 30, 10);

pokeDex1.push(new Pokemon("Pikachu_A", 100, 100, [thunderShock]));
pokeDex1.push(new Pokemon("Snorlax_A", 100, 100, [earthquake]));
pokeDex1.push(new Pokemon("Rattata_A", 100, 100, [quickAttack]));
pokeDex2.push(new Pokemon("Pikachu_B", 100, 100, [thunderShock]));
pokeDex2.push(new Pokemon("Snorlax_B", 100, 100, [earthquake]));
pokeDex2.push(new Pokemon("Rattata_B", 100, 100, [quickAttack]));

// DOM FUNCTIONS
// fight info
function fightInfo(str){
    return document.getElementById('info').innerHTML = str;
}

function resetInfo(){
    return setTimeout(() => document.getElementById('info').innerHTML = '', 1500);
}

// pokemon selection
function selectPokemon(player, selection){

    if(selection != 'select'){
        if(player == 1){
            pokemon1 = pokeDex1.find(p => p.ID == selection + '_A');
            document.getElementById(`health${player}`).value = pokemon1.health;
            document.getElementById(`mana${player}`).value = pokemon1.mana;
        }
        if(player == 2){
            pokemon2 = pokeDex2.find(p => p.ID == selection + '_B');
            document.getElementById(`health${player}`).value = pokemon2.health;
            document.getElementById(`mana${player}`).value = pokemon2.mana;
        }

        document.getElementById(`name${player}`).innerHTML = selection;
        document.getElementById(`pic${player}`).src = `./img/${selection.toLowerCase()}.png`;
        document.getElementById(`pic${player}`).alt = `${selection}`;
    }
}

// attacks
function attack(player, index){
    if(player == 1) pokeDex1.find(p => p.ID == pokemon1.ID).attack(index, pokeDex2.find(p => p.ID == pokemon2.ID));
    if(player == 2) pokeDex2.find(p => p.ID == pokemon2.ID).attack(index, pokeDex1.find(p => p.ID == pokemon1.ID));
}

// potions
function addHealth(player, amount){
    if(player == 1) pokeDex1.find(p => p.ID == pokemon1.ID).addHealth(amount)
    if(player == 2) pokeDex2.find(p => p.ID == pokemon2.ID).addHealth(amount)
}
function addMana(player, amount){
    if(player == 1) pokeDex1.find(p => p.ID == pokemon1.ID).addMana(amount)
    if(player == 2) pokeDex2.find(p => p.ID == pokemon2.ID).addMana(amount)
}