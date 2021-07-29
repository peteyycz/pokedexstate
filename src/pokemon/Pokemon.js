import { useService } from "@xstate/react";
import { useEffect } from "react";

export function Pokemon({ service }) {
  const [{ context, matches }, send] = useService(service);

  if (matches("failure")) {
    return (
      <div>
        Failed to load pokemon. <button onClick={(_) => send("RETRY")}>Retry?</button>
      </div>
    );
  }

  const { pokemon } = context;

  return (
    <section>
      {pokemon && (
        <>
          <h1>
            {pokemon.name}
            <span>#{pokemon.order}</span>
          </h1>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <h2>Abilities</h2>
          <ul>
            {pokemon.abilities.map(({ ability }) => {
              return <li key={ability.name}>{ability.name}</li>;
            })}
          </ul>
          <h2>Types</h2>
          <ul>
            {pokemon.types.map(({ type }) => {
              return <li key={type.name}>{type.name}</li>;
            })}
          </ul>
        </>
      )}
    </section>
  );
}
