import { useMachine, useService } from "@xstate/react";
import { Badge, Button, ButtonGroup, Col, Container, Row, ListGroup } from "react-bootstrap";
import { Pokemon } from "./Pokemon";
import { allPokemonMachine } from "./state-machines/all-pokemon";

export const AllPokemon = () => {
  const [{ matches, context }, send] = useMachine(allPokemonMachine, { devTools: true });
  const { page, allPokemon, selectedPokemon: selectedPokemonMachine } = context;

  if (matches("loading")) {
    return <span>loading</span>;
  }

  return (
    <Container>
      <Row>
        <Col>
          <h1>
            PokedeXState <Badge bg="secondary">#{page + 1}</Badge>
          </h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <ListGroup>
            {allPokemon.map(({ name }) => {
              return (
                <ListGroup.Item onClick={() => send("SELECT", { name })} key={name}>
                  {name}
                </ListGroup.Item>
              );
            })}
          </ListGroup>
          <div>
            <ButtonGroup aria-label="Basic example">
              <Button onClick={() => send("PREVIOUS_PAGE")} variant="primary">
                Previous page
              </Button>
              <Button onClick={() => send("NEXT_PAGE")} variant="primary">
                Next page
              </Button>
            </ButtonGroup>
          </div>
        </Col>
        <Col>{selectedPokemonMachine && <Pokemon service={selectedPokemonMachine} />}</Col>
      </Row>
    </Container>
  );
};
