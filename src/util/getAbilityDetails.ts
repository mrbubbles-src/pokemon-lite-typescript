import axios from "axios";
import getAbilityList from "./getAbilityList";

interface IAbilities {
    name: string;
    attackPower: number;
    mpCost: number;
    type: string;
    url: string;
}

async function fetchAbilityDetails(ability: { name: string; url: string }) {
    const response = await axios.get(ability.url);
    const data = await response.data;
    return {
        name: ability.name.charAt(0).toUpperCase() + ability.name.slice(1),
        attackPower: data.power !== null ? data.power : 50,
        mpCost: data.pp,
        type: data.type.name,
        url: ability.url,
    };
}

async function getAbilityDetails() {
    const abilityList = await getAbilityList();
    if (!abilityList) {
        throw new Error("Failed to fetch ability list");
    }
    const abilitiesPromises = abilityList.results.map(fetchAbilityDetails);
    return await Promise.all(abilitiesPromises);
}

export default async function getAbility() {
    let abilityDetailsList: IAbilities[] | undefined;
    const sessionStorageAbilityList: string | null =
        sessionStorage.getItem("abilityDetailsList");

    if (sessionStorageAbilityList !== null) {
        abilityDetailsList = JSON.parse(sessionStorageAbilityList);
    } else {
        try {
            abilityDetailsList = await getAbilityDetails();
            sessionStorage.setItem(
                "abilityDetailsList",
                JSON.stringify(abilityDetailsList)
            );
        } catch (error) {
            console.error("Failed to fetch ability details", error);
        }
    }
    return abilityDetailsList;
}
