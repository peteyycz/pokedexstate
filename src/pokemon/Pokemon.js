import { useService } from "@xstate/react";
import { useEffect } from "react";
import { Card, ListGroup, ListGroupItem, Spinner} from "react-bootstrap";

export function Pokemon({ service }) {
  const [{ context, matches }, send] = useService(service);

  if (matches("loading")) {
    return (
      <Card>
        <Card.Body>
      <Spinner animation="border" />
        </Card.Body>
      </Card>
    );
  }

  if (matches("failure")) {
    return (
      <div>
        Failed to load pokemon. <button onClick={(_) => send("RETRY")}>Retry?</button>
      </div>
    );
  }

  const { pokemon } = context;

  return (
    <Card>
      <Card.Img variant="top" src={pokemon.sprites.front_default} />
      <Card.Body>
        <Card.Title>
          {pokemon.name}
          <span>#{pokemon.order}</span>
        </Card.Title>
        <Card.Text>
          <ListGroup>
            <ListGroup.Item variant="dark">Abilities</ListGroup.Item>
            {pokemon.abilities.map(({ ability }) => {
              return <ListGroup.Item key={ability.name}>{ability.name}</ListGroup.Item>;
            })}
          </ListGroup>
          <ListGroup>
            <ListGroup.Item variant="dark">Types</ListGroup.Item>
            {pokemon.types.map(({ type }) => {
              return <ListGroup.Item key={type.name}>{type.name}</ListGroup.Item>;
            })}
          </ListGroup>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
