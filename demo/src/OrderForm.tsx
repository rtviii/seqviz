import React from "react";
import { Button, ButtonGroup, Form, ToggleButton } from "react-bootstrap";

export function OrderForm(props: {
  sequence: string;
  setSequence: React.Dispatch<React.SetStateAction<string>>;
  speedValue: string;
  setSpeedValue: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { sequence, setSequence, speedValue, setSpeedValue } = props;
  return (
    <Form>
      <Form.Label as="h3">Place an RNA order</Form.Label>
      <Form.Group className="mb-3">
        <Form.Label>Sequence Data</Form.Label>
        <Form.Control
          type="textarea"
          placeholder="Enter sequence to manufacture"
          value={sequence}
          onChange={e => setSequence(e.target.value)}
        />
      </Form.Group>
      <Form.Label>Order Speed</Form.Label>
      <Form.Group className="mb-3">
        <ButtonGroup className="mb-2">
          {[
            { name: "Standard", style: "outline-secondary" },
            { name: "Expedited", style: "outline-primary" },
            { name: "Urgent", style: "outline-danger" },
          ].map((radio, idx) => (
            <ToggleButton
              key={idx}
              id={`radio-${idx}`}
              type="radio"
              variant={radio.style}
              name="radio"
              value={radio.name}
              checked={speedValue === radio.name}
              onChange={e => setSpeedValue(e.currentTarget.value)}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Order Notes</Form.Label>

        <Form.Control as="textarea" placeholder="Leave a comment here" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form.Group>
    </Form>
  );
}
