import { useMachine } from "@xstate/react";
import {Pokemon} from "./Pokemon";
import { allPokemonMachine } from "./state-machines/all-pokemon";

export const AllPokemon = () => {
  const [{ matches, context }, send] = useMachine(allPokemonMachine, {devTools: true});

  if (matches("loading")) {
    return <span>loading</span>;
  }

  const { page, allPokemon, selectedPokemon } = context;

  return (
    <div>
      Page: {page + 1}
      <ul>
        {allPokemon.map(({ name }) => {
          return (
            <li
              onClick={() => send("SELECT", { name })}
              style={{
                background: selectedPokemon === name ? "red" : "white",
              }}
              key={name}
            >
              {name}
            </li>
          );
        })}
      </ul>
      <button onClick={() => send("PREVIOUS_PAGE")}>Previous page</button>
      <button onClick={() => send("NEXT_PAGE")}>Next page</button>

      {console.log(selectedPokemon)}

      {selectedPokemon && <Pokemon service={selectedPokemon} />}
    </div>
  );
};
