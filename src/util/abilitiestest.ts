import { MoveClient } from "pokenode-ts";

(async () => {
    const api = new MoveClient();

    await api
        .listMoves(0, 934)
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
})();
