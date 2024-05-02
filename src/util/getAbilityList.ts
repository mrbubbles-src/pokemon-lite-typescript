import { MoveClient, NamedAPIResourceList } from "pokenode-ts";

export default async function getAbilityList(): Promise<
    NamedAPIResourceList | undefined
> {
    const api = new MoveClient();
    const gen1Abilities: string[] = [
        "pound",
        "karate-chop",
        "double-slapt",
        "comet-punch",
        "mega-punch",
        "pay-day",
        "scratch",
        "vice-grip",
        "razor-wind",
        "cut",
        "gust",
        "wing-attack",
        "fly",
        "slam",
        "vine-whip",
        "stomp",
        "double-kick",
        "mega-kick",
        "jump-kick",
        "rolling-kick",
        "headbutt",
        "horn-attack",
        "fury-attack",
        "tackle",
        "take-down",
        "thrash",
        "double-edge",
        "pin-missile",
        "bite",
        "sonic-boom",
        "water-gun",
        "hydro-pump",
        "surf",
        "hyper-beam",
        "peck",
        "drill-peck",
        "submission",
        "low-kick",
        "counter",
        "seismic-toss",
        "strength",
        "razor-leaf",
        "solar-beam",
        "petal-dance",
        "dragon-rage",
        "rock-throw",
        "earthquake",
        "dig",
        "quick-attack",
        "rage",
        "night-shade",
        "bide",
        "self-destruct",
        "egg-bomb",
        "bone-club",
        "waterfall",
        "swift",
        "skull-bash",
        "spike-cannon",
        "high-jump-kick",
        "barrage",
        "sky-attack",
        "psywave",
        "crabhammer",
        "explosion",
        "fury-swipes",
        "bonemerang",
        "rock-slide",
        "hyper-fang",
        "super-fang",
        "slash",
        "struggle",
    ];
    try {
        const data = await api.listMoves(0, 937);
        const filteredData = {
            count: data.count,
            next: data.next,
            previous: data.previous,
            results: data.results.filter((ability) =>
                gen1Abilities.includes(ability.name)
            ),
        };
        return filteredData;
    } catch (error) {
        console.error(error);
    }

    return undefined;
}
