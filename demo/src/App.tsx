import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Image, Row } from "react-bootstrap";
import { Doughnut } from "react-chartjs-2";
import { SeqViz } from "seqviz";
import "./App.css";
import logo0 from "./assets/logo0.jpg";
import logo1 from "./assets/logo1.jpg";
import logo2 from "./assets/logo2.jpg";
import logo3 from "./assets/logo3.jpg";
import { BrokerNavBar } from "./BrokerNavBar";
import { OrderForm } from "./OrderForm";

ChartJS.register(ArcElement, Tooltip, Legend);

const randIntBetween = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

function App() {
  const [sequence, setSequence] = useState<string>(
    "TTATGAATTCGTATGCGTTGTCCTTGGAGTATTAATATTGTTCATGTGGGCAGGCTCAGGTTGAGGTTGAG"
  );
  const [speedValue, setSpeedValue] = useState<string>("Standard");
  const [submitted, setSubmitted] = useState(true);
  const [manufactureScore, setManufactureScore] = useState<number | null>(89);

  const defaultProps = {
    translations: [],
    rotateOnScroll: true,
    viewer: "linear" as const,
    annotations: [],
    showAnnotations: true,
    showComplement: true,
    showIndex: true,
    zoom: { linear: 100, circular: 0 },
    style: { height: "600px", width: "100%" },
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
      <Card style={{ marginBottom: 8 }} key={JSON.stringify(m)}>
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
      <>
        <Form.Label as="h3">Manufacturers</Form.Label>

        {manufacturers.map(m => renderManufacturer(m))}
      </>
    );
  };
  return (
    <div className="App">
      {BrokerNavBar()}

      <Container>
        <Row style={{ margin: 16 }}>
          <Col md={12} lg={6}>
            <Row style={{ marginBottom: 16 }}>{manufactureScore && <ManufactureViz score={manufactureScore} />}</Row>
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
    </div>
  );
}

const ManufactureViz = (props: { score: number }) => {
  const { score } = props;
  const categories = ["Sequence Length", "GC Content", "5' Cap", "3' UTR"];
  let remainingInfluence = score;
  const influence = categories.map(_ => {
    const x = randIntBetween(0, remainingInfluence);
    remainingInfluence -= x;
    return x;
  });

  const data = {
    labels: categories,
    datasets: [
      {
        label: "Contribution",
        data: influence,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Form.Label as="h3">Manufacture Score: {score}</Form.Label>
      <div style={{ height: 400, position: "relative", marginBottom: "1%", padding: "1%" }}>
        <Doughnut data={data} height={400} width={400} options={{ maintainAspectRatio: false }} />
      </div>
    </>
  );
};

export default App;
