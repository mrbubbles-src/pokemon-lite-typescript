import { AttackSkillInterface } from "../models/attack-skill-interface";
export class CreateAttackSkill implements AttackSkillInterface {
    constructor(
        public skillName: string,
        public dmgAmount: number,
        public mpCost: number
    ) {}
}
