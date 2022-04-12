import * as React from "react";
import WrappedGroupLabel from "../Circular/WrappedGroupLabel";
import { Coor, ILabel, InputRefFuncType, ISize } from "../common";

interface LabelWithCoors {
  label: ILabel;
  lineCoor: Coor;
  textCoor: Coor;
  textAnchor: unknown;
}

interface GroupedLabelsWithCoors {
  name: string;
  textAnchor: unknown;
  textCoor: Coor;
  lineCoor: Coor;
  labels: ILabel[];
  grouped: unknown;
  overflow: unknown;
}

interface LabelsProps {
  labels: ILabel[];
  size: ISize;
  yDiff: number;
  lineHeight: number;
  seqLength: number;
  findCoor: (index: number) => Coor;
  inputRef: InputRefFuncType;
}

interface LabelsState {
  hoveredGroup: unknown;
}

/**
 * Linear Analogoue to /Circular/Labels.tsx
 */
const Labels = (props: LabelsProps) => {
  const { labels, size, yDiff, lineHeight, seqLength, findCoor, inputRef } = props;
  const setHoveredGroup = () => console.log("setHoveredGroup called");
  return (
    <g>
      <WrappedGroupLabel
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        group={hovered}
        size={size}
        setHoveredGroup={setHoveredGroup}
        lineHeight={lineHeight}
      />
    </g>
  );
};

export default Labels;
