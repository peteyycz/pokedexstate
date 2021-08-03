import { createMachine, assign, spawn } from "xstate";
import { apiClient } from "../../api-client";
import { createPokemonMachine } from "./pokemon";

async function invokeFetchPokemon(context) {
  const { page } = context;
  const { data } = await apiClient.get(`pokemon?offset=${page * 20}&limit=20`);
  return data;
}

const PAGING = {
  PREVIOUS_PAGE: {
    target: "loading",
    actions: assign({
      page: ({ page }) => page - 1,
    }),
  },
  NEXT_PAGE: {
    target: "loading",
    actions: assign({
      page: ({ page }) => page + 1,
    }),
  },
};

const SELECT = {
  SELECT: {
    target: "selected",
    actions: assign({
      selectedPokemon: (_, event) => spawn(createPokemonMachine(event.name)),
    }),
  },
};

export const allPokemonMachine = createMachine({
  id: "all-pokemon",
  initial: "loading",
  context: {
    page: 0,
    allPokemon: [],
    selectedPokemon: null,
  },
  states: {
    selected: {
      on: {
        ...SELECT,
        ...PAGING,
      },
    },
    loading: {
      invoke: {
        id: "fetch-all-pokemon",
        src: invokeFetchPokemon,
        onDone: {
          target: "loaded",
          actions: assign({
            allPokemon: (_, event) => event.data.results,
          }),
        },
        onError: "failed",
      },
    },
    loaded: {
      on: {
        REFRESH: "loading",
        ...SELECT,
        ...PAGING,
      },
    },
    failed: {
      on: {
        RETRY: "loading",
      },
    },
  },
});
