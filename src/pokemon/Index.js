import { useMachine } from "@xstate/react";

import { createPokemonNameMachine } from "./state-machines/pokemon-name";
import { Pokemon } from "./Pokemon";

const pokemonNames = ["pikachu", "ditto", "bulbasaurr", "unknown"];

export function Index() {
  const [current, send] = useMachine(createPokemonNameMachine);
  const { selectedPokemon } = current.context;

  return (
    <main>
      <header>
        <select
          onChange={(e) => {
            if (e.target.value === "none") {
              return send("RESET");
            }
            send("SELECT", { name: e.target.value });
          }}
        >
          <option key={null}>none</option>
          {pokemonNames.map((name) => {
            return <option key={name}>{name}</option>;
          })}
        </select>
      </header>
      <section style={{ margin: 50 }}>
        <h1>{current.matches("idle") && "Select a pokemon"}</h1>
        {selectedPokemon && <Pokemon name={selectedPokemon} />}
      </section>
    </main>
  );
}

