import { AttackSkillInterface } from "../models/attack-skill-interface.js";
import {
    PokemonInterface,
    AttackerPokemonInterface,
} from "../models/pokemon-interface.js";
import { CreateAttackSkill } from "./CreateAttackSkill.js";
export class Pokemon implements PokemonInterface, AttackerPokemonInterface {
    maxHealth: number;
    maxMagic: number;
    skills: { skillName: string; dmgAmount: number; mpCost: number }[] = [];
    constructor(
        public name: string,
        public health: number,
        public magic: number
    ) {
        this.maxHealth = health;
        this.maxMagic = magic;
    }
    showStatus(): string {
        let learnedSkills: string[] = [];
        if (this.skills.length === 0) {
            learnedSkills.push(`${this.name} has not learned any skills yet!`);
        }
        this.skills.map((skill) => learnedSkills.push(skill.skillName));
        return `${this.name}\nHP: ${this.health}/${this.maxHealth}\nMP: ${
            this.magic
        }/${this.maxMagic}\nAvailable Skills: ${learnedSkills.join(", ")}`;
    }
    learnAttackSkill(skill: AttackSkillInterface): string {
        if (this.skills.length === 4) {
            return `${this.name} can't learn ${skill.skillName}, since it already knows four abilities!`;
        } else if (this.skills.includes(skill)) {
            return `${this.name} already knows ${skill.skillName}!`;
        } else {
            this.skills.push(skill);
            return `${this.name} learned ${skill.skillName}!`;
        }
    }
    attack(
        skillIndex: number,
        attackedPokemon: AttackerPokemonInterface
    ): string {
        const selectedSkill = this.skills[skillIndex];
        if (!this.hasEnoughMagic(selectedSkill)) {
            return this.insufficientMagicMessage(selectedSkill);
        }
        return this.performAttack(selectedSkill, attackedPokemon);
    }
    healthPotion(): string {
        if (this.maxHealth - this.health === 0) {
            return `${this.name} is already at ${this.health}/${this.maxHealth}HP. No potion used.`;
        } else if (this.maxHealth - this.health <= 50) {
            this.health = this.maxHealth;
            return `${this.name} is now at ${this.health}/${this.maxHealth}HP - No more Potions needed!`;
        } else {
            this.health += 50;
            return `${this.name} used a Potion and restored 50HP. ${this.name} is now at ${this.health}/${this.maxHealth}HP.`;
        }
    }
    magicPotion(): string {
        if (this.maxMagic - this.magic === 0) {
            return `${this.name} is already at ${this.magic}/${this.maxMagic}MP. No potion used.`;
        } else if (this.maxMagic - this.magic <= 40) {
            this.magic = this.maxMagic;
            return `${this.name} is now at ${this.magic}/${this.maxMagic}MP - No more Potions needed!`;
        } else {
            this.magic += 40;
            return `${this.name} used a Potion and restored 40MP. ${this.name} is now at ${this.magic}/${this.maxMagic}MP.`;
        }
    }
    private performAttack(
        skill: AttackSkillInterface,
        attackedPokemon: AttackerPokemonInterface
    ): string {
        this.magic -= skill.mpCost;
        attackedPokemon.health -= skill.dmgAmount;
        if (attackedPokemon.health <= 0) {
            return this.attackSuccessMessage(skill, attackedPokemon);
        }
        return this.attackMessage(skill, attackedPokemon);
    }
    private hasEnoughMagic(skill: AttackSkillInterface): boolean {
        return this.magic >= skill.mpCost;
    }
    private insufficientMagicMessage(skill: AttackSkillInterface): string {
        return `${this.name} tried to use ${skill.skillName} but only has ${this.magic}MP left`;
    }
    private attackSuccessMessage(
        skill: AttackSkillInterface,
        attackedPokemon: AttackerPokemonInterface
    ): string {
        attackedPokemon.health = 0;
        return `${this.name} used ${skill.skillName} against ${attackedPokemon.name}. ${attackedPokemon.name} fainted! ${this.name} has won the battle!`;
    }
    private attackMessage(
        skill: AttackSkillInterface,
        attackedPokemon: AttackerPokemonInterface
    ): string {
        return `${this.name} used ${skill.skillName} against ${attackedPokemon.name} and dealt ${skill.dmgAmount} damage! ${attackedPokemon.name} has ${attackedPokemon.health}/${attackedPokemon.maxHealth} HP left`;
    }
}

// const pikachu = new Pokemon("Pikachu", 250, 100);
// const glumanda = new Pokemon("Glumanda", 200, 100);

// const thunder = new CreateAttackSkill("Thunder", 10, 5);
// const fire = new CreateAttackSkill("Fire", 12, 7);

// pikachu.learnAttackSkill(thunder);
// glumanda.learnAttackSkill(fire);
// console.log(pikachu.showStatus());
// console.log("---");
// console.log(glumanda.showStatus());
// console.log("---");

// console.log(pikachu.attack(0, glumanda));
// console.log("---");

// console.log(pikachu.showStatus());
// console.log("---");

// console.log(glumanda.showStatus());
