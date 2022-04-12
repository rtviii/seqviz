import * as React from "react";
import { useState } from "react";
import WrappedGroupLabel from "../Circular/WrappedGroupLabel";
import { Coor, ILabel, InputRefFuncType, ISize } from "../common";

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
  const [hoveredGroup, setHoveredGroup] = useState<unknown>(null);
  console.log(labels, yDiff, seqLength, findCoor, inputRef, hoveredGroup);
  return (
    <g>
      <WrappedGroupLabel
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        group={hoveredGroup}
        size={size}
        setHoveredGroup={setHoveredGroup}
        lineHeight={lineHeight}
      />
    </g>
  );
};

export default Labels;
