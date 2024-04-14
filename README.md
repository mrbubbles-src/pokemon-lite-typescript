# pokemon-lite-typescript

## Todos:

-   [...] Find API for all Pokemon and Pokemon Attacks
    -   [ ] fetch data from API(s)
        -   [ ] test CreatePokemon and CreateAttack Skill with API Data
-   create random function(s)
    -   create fully random pokemon (pick random pokemon from API data, pick 4 random skills)
    -   create random skill set (pick a pokemon and add 4 random skills)
-   [ ] Create website:
    -   [] part for "terminal" so user can choose, and fight pokemon
    -   [] part for pokedex
    -   [] part for skill-list

## Done:

-   [x] Refactor old JavaScript code to TypeScript code:
    -   [x] make component-base code:
        -   [x] create class components (in components)
            -   [x] CreatePokemon
            -   [x] CreateAttackSkill
        -   [x] create Interfaces (in models)
            -   [x] pokemon-interface.ts
                -   [x] AttackerPokemonInterface
                -   [x] PokemonInterface
            -   [x] attack-skill-interface
                -   [x] AttackSkillInterface
-   [x] make code more readable:
    -   [x] create private methods to split up attack logic
