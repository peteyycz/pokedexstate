import { createMachine, assign } from "xstate";

async function invokeFetchPokemonByName(context) {
  const { selectedPokemon } = context;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`);
  return response.json();
}

export const createPokemonMachine = (name) =>
  createMachine({
    id: "pokemon",
    initial: "loading",
    context: {
      selectedPokemon: name,
      pokemon: null,
      lastUpdated: null,
    },
    states: {
      loading: {
        invoke: {
          id: "fetch-pokemon-by-name",
          src: invokeFetchPokemonByName,
          onDone: {
            target: "loaded",
            actions: assign({
              pokemon: (_, event) => event.data,
              lastUpdated: () => Date.now()
            }),
          },
          onError: "failed",
        },
      },
      loaded: {
        on: {
          REFRESH: 'loading'
        }
      },
      failed: {
        on: {
          RETRY: 'loading'
        }
      },
    },
  });
