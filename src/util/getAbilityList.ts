import { MoveClient, NamedAPIResourceList } from "pokenode-ts";

export default async function getAbilityList(): Promise<
    NamedAPIResourceList | undefined
> {
    const api = new MoveClient();

    try {
        const data = await api.listMoves(0, 937);
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
    }

    return undefined;
}
