import { NamedAPIResourceList, PokemonClient } from "pokenode-ts";

export default async function getPokemonList(): Promise<
    NamedAPIResourceList | undefined
> {
    const api = new PokemonClient();

    // try {
    //     const data = await api.listPokemons(0, 1025);
    //     return data;
    // } catch (error) {
    //     console.error(error);
    // }
    try {
        const data = await api.listPokemons(0, 151);
        return data;
    } catch (error) {
        console.error(error);
    }

    return undefined;
}
