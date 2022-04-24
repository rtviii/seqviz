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
import { shuffle } from "./utils";

ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  const [sequence, setSequence] = useState<string>(
    "TTATGAATTCGTATGCGTTGTCCTTGGAGTATTAATATTGTTCATGTGGGCAGGCTCAGGTTGAGGTTGAGTTATGAATTCGTATGCGTTGTCCTTGGAGTATTAATATTGTTCATGTGGGCAGGCTCAGGTTGAGGTTGAGTTATGAATTCGTATGCGTTGTCCTTGGAGTATTAATATTGTTCATGTGGGCAGGCTCAGGTTGAGGTTGAGTTATGAATTCGTATGCGTTGTCCTTGG"
  );
  const [speedValue, setSpeedValue] = useState<string>("Standard");
  const [submitted, setSubmitted] = useState(false);
  const [manufactureScore, setManufactureScore] = useState<number | null>(null);

  const defaultProps = {
    translations: [],
    rotateOnScroll: true,
    viewer: "linear" as const,
    annotations: [],
    showAnnotations: true,
    showComplement: true,
    showIndex: true,
    zoom: { linear: 100, circular: 0 },
    style: { height: "100vh", width: "100%" },
  };

  const preSubmit = () => {
    const calculateManufactureScore = () => {
      return 84;
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
    const manufacturers = shuffle([
      {
        name: "DNA Script",
        logo: logo0,
        price: 100,
        turnaround: 5,
        description:
          "DNA Script was created to revolutionize DNA writing with enzymes. Our core R&D efforts have produced innovations in enzyme engineering, surface and nucleotide chemistries, and instrumentation.",
      },
      {
        name: "Sixfold",
        logo: logo1,
        price: 500,
        turnaround: 5,
        description:
          "Meet Mergo® — the next generation of targeted RNA delivery, computationally designed with biocompatible building blocks to reprogram any cell, in anybody.",
      },
      {
        name: "Sheffield Lab",
        logo: logo2,
        price: 1000,
        turnaround: 5,
        description:
          "The main goal of our lab is to establish an empirically well-supported unifying model of the neurobiology of complex memory formation and recall from the level of synapses and dendrites to large-scale ensembles of neurons that is based on data obtained from behaving animals engaged in memory-related tasks.",
      },
      {
        name: "RiboPro",
        logo: logo3,
        price: 2000,
        turnaround: 5,
        description:
          "RiboPro's custom mRNA synthesis provides transfection-ready mRNA. Via our on-website mRNAssembler™ you can easily design a high-performance mRNA of up to 15k nt.",
      },
    ]);

    const renderManufacturer = (m: {
      name: string;
      logo: string;
      price: number;
      turnaround: number;
      description: string;
    }) => (
      <Card
        key={JSON.stringify(m)}
        style={{ height: 300, paddingLeft: 0, paddingRight: 0, color: "white", marginBottom: 8 }}
      >
        <Image
          src={m.logo}
          height={300}
          rounded
          style={{
            objectFit: "cover",
            filter: "brightness(40%)",
          }}
        />
        <Card.ImgOverlay>
          <Card.Body>
            <Card.Text as="h5" style={{ top: 20, right: 20, position: "absolute" }}>
              ${m.price}
            </Card.Text>
            <Card.Text as="h6" style={{ top: 50, right: 20, position: "absolute" }}>
              Avg. Turnaround: {m.turnaround} weeks
            </Card.Text>
          </Card.Body>
          <Card.Body>
            <Card.Title>{m.name}</Card.Title>
            <Card.Text>{m.description}</Card.Text>
          </Card.Body>
          <Card.Body>
            <Button variant="primary">Place Order</Button>
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
    <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
      {BrokerNavBar()}
      <Container style={{ marginTop: 70 }}>
        <Row className="mt-4  mb-4 p-8">
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
