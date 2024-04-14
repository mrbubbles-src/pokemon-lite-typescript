export interface PokemonInterface {
    showStatus(): string;
    learnAttackSkill(skill: string): string;
    attack(skillIndex: number, attackedPokemon: string): string;
    healthPotion(): string;
    magicPotion(): string;
}
