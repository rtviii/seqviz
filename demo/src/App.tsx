import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Image, Row } from "react-bootstrap";
import { SeqViz } from "seqviz";
import "./App.css";
import logo0 from "./assets/logo0.jpg";
import logo1 from "./assets/logo1.jpg";
import logo2 from "./assets/logo2.jpg";
import logo3 from "./assets/logo3.jpg";
import { BrokerNavBar } from "./BrokerNavBar";
import { OrderForm } from "./OrderForm";

function App() {
  const [sequence, setSequence] = useState<string>(
    "TTATGAATTCGTATGCGTTGTCCTTGGAGTATTAATATTGTTCATGTGGGCAGGCTCAGGTTGAGGTTGAGGTTGAGGGAACTGCTGTTCCTGTTTATGAATTCGTATGCGTTGTCCTTGGAGTATTAATATTGTTCATGTGGGCAGGCTCAGGTTGAGGTTGAGGTTGAGGGAACTGCTGTTCCTGTTTATGAATTCGTATGCGTTGTCCTTGGAGTATTAATATTGTTCATGTGGGCAGGCTCAGGTTGAGGTTGAGGTTGAGGGAACTGCTGT"
  );
  const [speedValue, setSpeedValue] = useState<string>("Standard");
  const [submitted, setSubmitted] = useState(true);
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

  const preSubmit = () => (
    <Row style={{ margin: 16 }}>
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
          onSubmit={() => setSubmitted(true)}
        />
      </Col>
    </Row>
  );
  const postSubmit = () => {
    const manufacturers = [
      { name: "Manufacturer 1", logo: logo0, price: 100, turnaround: 5, description: "" },
      { name: "Manufacturer 2", logo: logo1, price: 100, turnaround: 5, description: "" },
      { name: "Manufacturer 3", logo: logo2, price: 100, turnaround: 5, description: "" },
      { name: "Manufacturer 4", logo: logo3, price: 100, turnaround: 5, description: "" },
    ];

    const renderManufacturer = (m: {
      name: string;
      logo: string;
      price: number;
      turnaround: number;
      description: string;
    }) => (
      <Card style={{ marginBottom: 8 }}>
        <Card.Header>{m.name}</Card.Header>
        <Card.Body>
          <Card.Title>{m.name}</Card.Title>
        </Card.Body>
        <Card.Body>
          <Image src={m.logo} width={50} height={50} />
          <Card.Text>With supporting text below as a natural lead-in to additional content.</Card.Text>
        </Card.Body>
        <Card.Body>
          <Button variant="primary">Order</Button>
        </Card.Body>
      </Card>
    );
    return (
      <Row style={{ margin: 16 }} className="g-4">
        <Col xs={6}>
          <Form.Label as="h3">Visualized Sequence</Form.Label>
          <SeqViz {...defaultProps} seq={sequence} />
        </Col>
        <Col xs={6}>{manufacturers.map(m => renderManufacturer(m))}</Col>
      </Row>
    );
  };
  return (
    <div className="App">
      {BrokerNavBar()}
      <Container>{!submitted ? preSubmit() : postSubmit()}</Container>
    </div>
  );
}

export default App;
