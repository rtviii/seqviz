import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Image, Row } from "react-bootstrap";
import { SeqViz } from "seqviz";
import "./App.css";
import logo0 from "./assets/logo0.jpg";
import logo1 from "./assets/logo1.jpg";
import logo2 from "./assets/logo2.jpg";
import logo3 from "./assets/logo3.jpg";
import { BrokerNavBar } from "./BrokerNavBar";
import { ManufactureViz } from "./ManufactureViz";
import { OrderForm } from "./OrderForm";

ChartJS.register(ArcElement, Tooltip, Legend);

export const randIntBetween = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

function App() {
  const [sequence, setSequence] = useState<string>(
    "TTATGAATTCGTATGCGTTGTCCTTGGAGTATTAATATTGTTCATGTGGGCAGGCTCAGGTTGAGGTTGAG"
  );
  const [speedValue, setSpeedValue] = useState<string>("Standard");
  const [submitted, setSubmitted] = useState(true);
  const [manufactureScore, setManufactureScore] = useState<number | null>(56);

  const defaultProps = {
    translations: [],
    rotateOnScroll: true,
    viewer: "linear" as const,
    annotations: [],
    showAnnotations: true,
    showComplement: true,
    showIndex: true,
    zoom: { linear: 100, circular: 0 },
    style: { height: "30vh", width: "100%" },
  };

  const preSubmit = () => {
    const calculateManufactureScore = () => {
      return randIntBetween(0, 100);
    };
    const onSubmit = () => {
      setManufactureScore(calculateManufactureScore);
      setSubmitted(true);
    };
    return (
      <OrderForm
        sequence={sequence}
        setSequence={setSequence}
        speedValue={speedValue}
        setSpeedValue={setSpeedValue}
        onSubmit={onSubmit}
      />
    );
  };
  const postSubmit = () => {
    const manufacturers = [
      { name: "DNA Script", logo: logo0, price: 100, turnaround: 5, description: "" },
      { name: "Sixfold", logo: logo1, price: 100, turnaround: 5, description: "" },
      { name: "Sheffield Lab", logo: logo2, price: 100, turnaround: 5, description: "" },
      { name: "RiboPro", logo: logo3, price: 100, turnaround: 5, description: "" },
    ];

    const renderManufacturer = (m: {
      name: string;
      logo: string;
      price: number;
      turnaround: number;
      description: string;
    }) => (
      <Card
        key={JSON.stringify(m)}
        style={{ height: 300, paddingLeft: 0, paddingRight: 0, color: "white", marginBottom: 16 }}
      >
        <Image
          src={m.logo}
          height={300}
          rounded
          style={{
            objectFit: "cover",
            filter: "brightness(50%)",
          }}
        />
        <Card.ImgOverlay>
          <Card.Body>
            <br />
            <br />
          </Card.Body>
          <Card.Body>
            <Card.Title>{m.name}</Card.Title>
            <Card.Text>With supporting text below as a natural lead-in to additional content.</Card.Text>
          </Card.Body>
          <Card.Body>
            <Button variant="primary">Order</Button>
          </Card.Body>
        </Card.ImgOverlay>
      </Card>
    );
    return (
      <>
        <Form.Label as="h3">Manufacturers</Form.Label>
        <Col style={{ overflowY: "scroll", height: "60%" }}>{manufacturers.map(m => renderManufacturer(m))}</Col>
      </>
    );
  };
  return (
    <Container
      fluid
      style={{ paddingLeft: 0, paddingRight: 0, margin: 0, overflow: "hidden", height: "100vh", width: "100vw" }}
    >
      {BrokerNavBar()}
      <Container>
        <Row className="mt-4">
          <Col md={12} lg={6}>
            <Row>{manufactureScore && <ManufactureViz score={manufactureScore} />}</Row>
            <Row>
              <Form.Label as="h3">Visualized Sequence</Form.Label>
              <SeqViz {...defaultProps} seq={sequence} />
            </Row>
          </Col>
          <Col md={12} lg={6}>
            {!submitted ? preSubmit() : postSubmit()}
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default App;
