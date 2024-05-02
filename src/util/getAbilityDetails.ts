import axios from "axios";
import getAbilityList from "./getAbilityList";

interface IAbilities {
    name: string;
    attackPower: number;
    mpCost: number;
    type: string;
    url: string;
}

async function filterAbilityData() {
    const abilityList = await getAbilityList();
    const filteredAbilities: IAbilities[] = [];

    try {
        if (abilityList) {
            abilityList.results.map(async (ability) => {
                const response = await axios.get(ability.url);
                const data = await response.data;
                filteredAbilities.push({
                    name: ability.name,
                    attackPower: data.power !== null ? data.power : 50,
                    mpCost: data.pp,
                    type: data.type.name,
                    url: ability.url,
                });
            });
            console.log(filteredAbilities);
            return filteredAbilities;
        }
    } catch (error) {
        console.error(error);
    }
}
export default async function getAbilityDetails() {
    const abilities = await filterAbilityData();
}

///////////////////////////////////////////////////////////////
// works but takes ages. probably more efficient version above
// export default async function filterAbilities() {
//     const abilityList = await getAbilityList();
//     const filteredAbilities: IAbilities[] = [];

//     try {
//         if (abilityList) {
//             const abilityPromises = abilityList.results.map(async (ability) => {
//                 const response = await axios.get(ability.url);
//                 const data = await response.data;
//                 if (
//                     data.generation.name === "generation-i" &&
//                     data.meta.category.name === "damage"
//                 ) {
//                     return {
//                         name: ability.name,
//                         attackPower: data.power,
//                         mpCost: data.pp / 2,
//                         type: data.meta.category.name,
//                         url: ability.url,
//                     };
//                 }
//             });

//             const abilities = await Promise.all(abilityPromises);
//             for (const ability of abilities) {
//                 if (ability) {
//                     filteredAbilities.push(ability);
//                 }
//             }
//         }
//         console.log(filteredAbilities);

//         // filteredAbilities.map((ability) => {
//         //     console.log(`"${ability.name}"`);
//         // });

//         return filteredAbilities;
//     } catch (error) {
//         console.error(error);
//     }
// }
