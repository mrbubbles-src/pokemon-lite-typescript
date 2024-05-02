// import getAbilityList from "./util/getAbilityList";
import getPokemonDetails from "./util/getPokemonDetails";
import getPokemonList from "./util/getPokemonList";
import { NamedAPIResourceList } from "pokenode-ts";
// [
//     { name: "voltorb", url: "https://pokeapi.co/api/v2/pokemon/101/" },
// ]
async function getAPkmn() {
    const pokemonList: NamedAPIResourceList | undefined =
        await getPokemonList();
    console.log(pokemonList);
    if (pokemonList === undefined) {
        throw new Error("Pokemon couldn't be found");
    }
    const pokemonDetailsPromises = pokemonList.results.map(async (pokemon) => {
        let pokeName = pokemon.name;
        let pokeUrl = pokemon.url;

        const pkmn = await getPokemonDetails(pokeName, pokeUrl);
        return pkmn;
    });
    const pokemonDetails = await Promise.all(pokemonDetailsPromises);
    console.log(pokemonDetails);
    return pokemonDetails;
}

getAPkmn();
// const abilityList = await getAbilityList();

// // console.log(abilityList);
