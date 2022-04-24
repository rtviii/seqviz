import React from "react";
import { Form } from "react-bootstrap";
import { Doughnut } from "react-chartjs-2";
import { randIntBetween } from "./App";

export const ManufactureViz = (props: { score: number }) => {
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
      <Form.Label as="h3">Manufacturability Score: {score}</Form.Label>
      <Form.Label className="text-muted">
        The manufacturability score estimates the complexity of building the input construct design. A higher score
        indicates a more difficult to manufacture design.
      </Form.Label>
      <div style={{ height: 400, position: "relative", marginBottom: "1%", padding: "1%" }}>
        <Doughnut data={data} height={400} width={400} options={{ maintainAspectRatio: false }} />
      </div>
    </>
  );
};
