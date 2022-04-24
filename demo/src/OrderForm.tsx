import React, { useRef, useState } from "react";
import { Button, ButtonGroup, Form, Overlay, Spinner, ToggleButton } from "react-bootstrap";

export function OrderForm(props: {
  sequence: string;
  setSequence: React.Dispatch<React.SetStateAction<string>>;
  speedValue: string;
  setSpeedValue: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => void;
}) {
  const { sequence, setSequence, speedValue, setSpeedValue, onSubmit } = props;
  const [highPurity, setHighPurity] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const highPurityTarget = useRef(null);

  return (
    <Form>
      <Form.Label as="h3">Place an RNA order</Form.Label>
      <Form.Group className="mb-3">
        <Form.Label as="h4">Sequence Data</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Enter sequence to manufacture"
          value={sequence}
          onChange={e => setSequence(e.target.value)}
          rows={5}
        />
      </Form.Group>

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
        <Form.Label as="h4">Order Parameters</Form.Label>
        <Form.Check type="switch" label="Well Frombulated" />
        <Form.Check type="switch" label="Low Turbidity" />
        <Form.Check type="switch" label="Deglompfed" />

        <Form.Check
          ref={highPurityTarget}
          type="switch"
          label="High Purity"
          onClick={() => setHighPurity(!highPurity)}
        />
        <Overlay target={highPurityTarget.current} show={highPurity} placement="bottom-start">
          {({ placement, arrowProps, show: _show, popper, ...props }) => (
            <div
              {...props}
              style={{
                position: "absolute",
                backgroundColor: "red",
                padding: "1px 8px",
                marginTop: 4,
                color: "white",
                borderRadius: 3,
                ...props.style,
              }}
            >
              Warning: this will significantly increase manufacturing time.
            </div>
          )}
        </Overlay>
      </Form.Group>

      <Form.Group className="mb-4 mt-4">
        <Form.Label>Order Notes</Form.Label>

        <Form.Control as="textarea" placeholder="Leave a comment here" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Button
          variant="primary"
          type="submit"
          onClick={() => {
            setSubmitting(true);
            setTimeout(() => onSubmit(), 2000);
          }}
          disabled={submitting}
        >
          {submitting && (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              style={{ marginRight: 8 }}
            />
          )}
          {submitting ? "Finding Manufacturers..." : "Find Manufacturers"}
        </Button>
      </Form.Group>
    </Form>
  );
}
