import * as React from "react";
import { useState } from "react";

import WrappedGroupLabel from "../Circular/WrappedGroupLabel";
import { Coor, IGroup, ILabel, ISize, InputRefFuncType } from "../common";

interface LabelsProps {
  labels: ILabel[];
  size: ISize;
  yDiff: number;
  lineHeight: number;
  seqLength: number;
  findCoor: (index: number) => Coor;
  inputRef: InputRefFuncType;
}

/**
 * Linear Analogoue to /Circular/Labels.tsx
 */
const Labels = (props: LabelsProps) => {
  const { labels, size, yDiff, lineHeight, seqLength, findCoor, inputRef } = props;
  const [hoveredGroup, setHoveredGroup] = useState<IGroup>({
    labels: labels,
    forkCoor: { x: 0, y: 0 },
    lineCoor: { x: 0, y: 0 },
    textCoor: { x: 0, y: 0 },
    textAnchor: "",
  });
  console.log(labels, yDiff, seqLength, findCoor, inputRef, hoveredGroup);
  return (
    <g>
      <WrappedGroupLabel group={hoveredGroup} size={size} setHoveredGroup={setHoveredGroup} lineHeight={lineHeight} />
    </g>
  );
};

export default Labels;
