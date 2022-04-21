import React, { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { SeqViz } from "seqviz";
import "./App.css";
import { BrokerNavBar } from "./BrokerNavBar";
import { OrderForm } from "./OrderForm";

function App() {
  const [sequence, setSequence] = useState<string>(
    "TTATGAATTCGTATGCGTTGTCCTTGGAGTATTAATATTGTTCATGTGGGCAGGCTCAGGTTGAGGTTGAGGTTGAGGGAACTGCTGTTCCTGTTTATGAATTCGTATGCGTTGTCCTTGGAGTATTAATATTGTTCATGTGGGCAGGCTCAGGTTGAGGTTGAGGTTGAGGGAACTGCTGTTCCTGTTTATGAATTCGTATGCGTTGTCCTTGGAGTATTAATATTGTTCATGTGGGCAGGCTCAGGTTGAGGTTGAGGTTGAGGGAACTGCTGT"
  );
  const [rangeValue, setRangeValue] = useState<number>(90);
  const [speedValue, setSpeedValue] = useState<string>("Standard");
  const defaultProps = {
    translations: [],
    rotateOnScroll: true,
    viewer: "linear" as const,
    annotations: [],
    showAnnotations: true,
    showComplement: true,
    showIndex: true,
    zoom: { linear: 50, circular: 0 },
    style: { height: "70vh", width: "100%" },
  };
  return (
    <div className="App">
      {BrokerNavBar()}
      <Container>
        <Row style={{ margin: 16 }} className="h-70">
          <Col xs={6}>
            <Form.Label as="h3">Visualized Sequence</Form.Label>
            <SeqViz {...defaultProps} seq={sequence} />
          </Col>
          <Col xs={6}>
            <OrderForm
              sequence={sequence}
              setSequence={setSequence}
              speedValue={speedValue}
              setSpeedValue={setSpeedValue}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
