import axios from "axios";
import getPokemonList from "./getPokemonList";
import { NamedAPIResourceList } from "pokenode-ts";
interface IPkmnAttributes {
    hp: number;
    attack: number;
    type: string;
}
interface IPokemon {
    name: string;
    img: string;
    attributes: IPkmnAttributes;
}

async function getPokemonDetails(
    pkmnName: string,
    pkmnUrl: string
): Promise<{} | undefined> {
    const pokemonName = pkmnName.charAt(0).toUpperCase() + pkmnName.slice(1);
    try {
        const response = await axios.get(pkmnUrl);
        const data = response.data;
        const pkmnAttributes: IPkmnAttributes = {
            // max possible HP and Attack based off of this https://pokemondb.net/pokebase/6506/there-formula-for-working-pokemons-highest-possible-stats#:~:text=Yes%2C%20there%20is%20a%20formula%2C%20which%20is%20not,1.1%20with%2010%20instead%20of%205%20for%20HP.
            hp: Math.round(data.stats[0].base_stat * 2 + 204),
            attack: Math.round((data.stats[0].base_stat * 2 + 99) * 1.1),
            type: data.types[0].type.name,
        };
        const pokemon: IPokemon = {
            name: pokemonName,
            img: data.sprites.front_default,
            attributes: { ...pkmnAttributes },
        };
        return pokemon;
    } catch (error) {
        console.error(error);
    }
    return undefined;
}
// import getAbilityList from "./util/getAbilityList";

export default async function getPokemon() {
    let pokemonDetailsList: ({} | undefined)[];
    const sessionStoragePkmnList: string | null =
        sessionStorage.getItem("pokemonDetails");

    if (sessionStoragePkmnList !== null) {
        pokemonDetailsList = JSON.parse(sessionStoragePkmnList);
        console.log("data from session storage", pokemonDetailsList);
    } else {
        const pokemonList: NamedAPIResourceList | undefined =
            await getPokemonList();
        console.log(pokemonList);
        if (pokemonList === undefined) {
            throw new Error("Pokemon could not be found.");
        }
        const pokemonDetailsPromises = pokemonList.results.map(
            async (pokemon) => {
                let pokeName = pokemon.name;
                let pokeUrl = pokemon.url;

                const pkmn = await getPokemonDetails(pokeName, pokeUrl);
                return pkmn;
            }
        );
        pokemonDetailsList = await Promise.all(pokemonDetailsPromises);
        console.log("data from fetch", pokemonDetailsList);
        sessionStorage.setItem(
            "pokemonDetails",
            JSON.stringify(pokemonDetailsList)
        );
    }
    return pokemonDetailsList;
}
