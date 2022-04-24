import React from "react";
import { Form } from "react-bootstrap";
import { Doughnut } from "react-chartjs-2";
import { randIntBetween } from "./utils";

export const ManufactureViz = (props: { score: number }) => {
  const { score } = props;
  const categories = ["Construct Length", "GC Content", "Purity Level", "Packaging Complexity"];
  let remainingInfluence = score;
  const influence = categories.map(_ => {
    const x = randIntBetween(0, remainingInfluence);
    remainingInfluence -= x;
    return x;
  });

  const mostInfluentialIdx = influence.indexOf(Math.max(...influence));
  const mostInfluential = categories[mostInfluentialIdx];

  const borderColors = [
    "rgba(255, 99, 132, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 159, 64, 1)",
  ];
  const backgroundColors = [
    "rgba(255, 99, 132, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(255, 206, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(153, 102, 255, 0.2)",
    "rgba(255, 159, 64, 0.2)",
  ];
  const mostInfluentialColor = borderColors[mostInfluentialIdx];

  const data = {
    labels: categories,
    datasets: [
      {
        label: "Contribution",
        data: influence,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Form.Label as="h3">Manufacturability Score: {score}</Form.Label>
      <Form.Label className="text-muted">
        The manufacturability score estimates the complexity of building the input construct design. A{" "}
        <strong>higher score</strong> indicates a <strong>more difficult</strong> to manufacture design.
      </Form.Label>
      <Form.Label>
        Your design has a{" "}
        <strong style={{ color: score >= 51 ? "red" : "green" }}>{score >= 51 ? "HIGH" : "LOW"}</strong> score. This is
        primarily due to the <strong style={{ color: mostInfluentialColor }}>{mostInfluential}</strong> of your design.
      </Form.Label>

      <div style={{ height: 400, position: "relative", marginBottom: "1%", padding: "1%" }}>
        <Doughnut data={data} height={400} width={400} options={{ maintainAspectRatio: false }} />
      </div>
    </>
  );
};
