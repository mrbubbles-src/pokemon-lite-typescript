import axios from "axios";
import getPokemonList from "./getPokemonList";

interface IPkmnAttributes {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
}

interface IPokemon {
    id: number;
    name: string;
    img: string;
    level: number;
    types: string;
    attributes: IPkmnAttributes;
    url: string;
}

async function fetchPokemonDetails(pokemon: { name: string; url: string }) {
    const response = await axios.get(pokemon.url);
    const data = response.data;
    const pkmnAttributes: IPkmnAttributes = {
        hp: Math.round(data.stats[0].base_stat * 2 + 204),
        attack: Math.round((data.stats[1].base_stat * 2 + 99) * 1.1),
        defense: Math.round((data.stats[2].base_stat * 2 + 99) * 1.1),
        specialAttack: Math.round((data.stats[3].base_stat * 2 + 99) * 1.1),
        specialDefense: Math.round((data.stats[4].base_stat * 2 + 99) * 1.1),
        speed: Math.round((data.stats[5].base_stat * 2 + 99) * 1.1),
    };
    return {
        id: data.id,
        name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
        img: data.sprites.front_default,
        level: 100,
        types: data.types.map(
            (type: { type: { name: string } }) =>
                type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)
        ),
        attributes: pkmnAttributes,
        url: pokemon.url,
    };
}

async function getPokemonDetails() {
    const pokemonList = await getPokemonList();
    if (!pokemonList) {
        throw new Error("Failed to fetch Pokemon list");
    }
    const pokemonDetailsPromises = pokemonList.results.map(fetchPokemonDetails);
    return await Promise.all(pokemonDetailsPromises);
}

export default async function getPokemon() {
    let pokemonDetailsList: IPokemon[] | undefined;
    const sessionStoragePkmnList: string | null =
        sessionStorage.getItem("pokemonDetails");

    if (sessionStoragePkmnList !== null) {
        pokemonDetailsList = JSON.parse(sessionStoragePkmnList);
    } else {
        try {
            pokemonDetailsList = await getPokemonDetails();
            sessionStorage.setItem(
                "pokemonDetails",
                JSON.stringify(pokemonDetailsList)
            );
        } catch (error) {
            console.error("Failed to fetch Pokemon details", error);
        }
    }
    return pokemonDetailsList;
}
