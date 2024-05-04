import getPokemon from "./util/getPokemonDetails";

import getAbility from "./util/getAbilityDetails";
import { Pokemon } from "./components/CreatePokemon";
import { CreateAttackSkill } from "./components/CreateAttackSkill";

const pkmnList = (await getPokemon()) ?? [];
const abilityList = (await getAbility()) ?? [];

const pound = new CreateAttackSkill(
    abilityList[0]?.name,
    abilityList[0]?.attackPower,
    abilityList[0]?.mpCost
);
const vineWhip = new CreateAttackSkill(
    abilityList[13]?.name,
    abilityList[13]?.attackPower,
    abilityList[13]?.mpCost
);
const headbutt = new CreateAttackSkill(
    abilityList[19]?.name,
    abilityList[19]?.attackPower,
    abilityList[19]?.mpCost
);
const razorLeaf = new CreateAttackSkill(
    abilityList[40]?.name,
    abilityList[40]?.attackPower,
    abilityList[40]?.mpCost
);

const bulbasaur = new Pokemon(
    pkmnList[0]?.name,
    pkmnList[0]?.attributes?.hp,
    pkmnList[0]?.attributes?.attack
);
bulbasaur.learnAttackSkill(pound);
bulbasaur.learnAttackSkill(vineWhip);
bulbasaur.learnAttackSkill(headbutt);
bulbasaur.learnAttackSkill(razorLeaf);

console.log(bulbasaur);

const ivysaur = new Pokemon(
    pkmnList[1]?.name,
    pkmnList[1]?.attributes?.hp,
    pkmnList[1]?.attributes?.attack
);
ivysaur.learnAttackSkill(pound);
ivysaur.learnAttackSkill(vineWhip);
ivysaur.learnAttackSkill(headbutt);
ivysaur.learnAttackSkill(razorLeaf);

console.log(ivysaur);

console.log(bulbasaur.attack(2, ivysaur));

console.log(bulbasaur.showStatus());
console.log(ivysaur.showStatus());
