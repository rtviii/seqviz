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
  const [splanched, setSplanched] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const splanchTarget = useRef(null);

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
        <Form.Check type="switch" label="Frombulate" />
        <Form.Check type="switch" label="Deglompf" />
        <Form.Check type="switch" label="Triple Quaxles" />
        <Form.Check ref={splanchTarget} type="switch" label="Splanch" onClick={() => setSplanched(!splanched)} />
        <Overlay target={splanchTarget.current} show={splanched} placement="bottom">
          {({ placement, arrowProps, show: _show, popper, ...props }) => (
            <div
              {...props}
              style={{
                position: "absolute",
                backgroundColor: "rgba(255, 100, 100, 0.85)",
                padding: "2px 10px",
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

      <Form.Group className="mb-3">
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
