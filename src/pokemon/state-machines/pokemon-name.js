import { createMachine, assign } from "xstate";

export const createPokemonNameMachine = createMachine({
  id: "pokemon-name",
  initial: "idle",
  context: {
    selectedPokemon: null,
  },
  on: {
    RESET: {
      target: 'idle',
    },
    SELECT: {
      target: ".selected",
      actions: assign({
        selectedPokemon: (_, event) => event.name,
      }),
    },
  },
  states: {
    idle: {},
    selected: {},
  },
});
