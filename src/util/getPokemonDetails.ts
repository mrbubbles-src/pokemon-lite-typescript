import axios from "axios";

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

export default async function getPokemonDetails(
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
