import { PokemonClient } from "pokenode-ts";

(async () => {
    const api = new PokemonClient();

    await api
        .listPokemons(0, 1025)
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
})();
