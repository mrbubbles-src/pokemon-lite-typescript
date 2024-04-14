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
    attack(skillIndex: number, attackedPokemon: AttackerPokemonInterface): void;
    healthPotion(): string;
    magicPotion(): string;
    performAttack(
        skillName: AttackSkillInterface,
        attackedPokemon: AttackerPokemonInterface
    ): string;
    hasEnoughMagic(skill: AttackSkillInterface): boolean;
    insufficientMagicMessage(skill: AttackSkillInterface): string;
    attackSuccessMessage(
        skill: AttackSkillInterface,
        attackedPokemon: AttackerPokemonInterface
    ): string;
    attackMessage(
        skill: AttackSkillInterface,
        attackedPokemon: AttackerPokemonInterface
    ): string;
}
