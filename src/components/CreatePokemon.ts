class Pokemon {
    maxHealth: number;
    maxMagic: number;
    skills: string[] = [];
    constructor(
        public name: string,
        public health: number,
        public magic: number
    ) {
        this.maxHealth = health;
        this.maxMagic = magic;
    }
}
