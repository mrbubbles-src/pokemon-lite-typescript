import { AttackSkillInterface } from "./attack-skill-interface";
export interface AttackerPokemonInterface {
    name: string;
    health: number;
    maxHealth: number;
    magic: number;
    maxMagic: number;
    skills: AttackSkillInterface[];
}
export interface PokemonInterface {
    showStatus(): string;
    learnAttackSkill(skill: AttackSkillInterface): string;
    attack(
        skillIndex: number,
        attackedPokemon: AttackerPokemonInterface
    ): string;
    healthPotion(): string;
    magicPotion(): string;
}
