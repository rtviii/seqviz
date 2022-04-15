import * as React from "react";
import { ICutSite, InputRefFuncType } from "../../common";
import { FindXAndWidthType } from "./SeqBlock";

interface ConnectorType {
  fcut: number;
  rcut: number;
  id: string;
  cutX: number;
  start: number;
  end: number;
  hangX: number;
  recogStrand: 1 | -1;
  d?: 1 | -1;
  name?: string;
  highlightWidth?: number;
  highlightX?: number;
  highlightColor?: string;
}

interface GroupedConnector {
  sites: ConnectorType[];
  startX: number;
  endX: number;
}

/**
 * on hover, an enzyme recognition site should have an opacity of 0.5. 0 otherwise
 * on hover, an enzyme name should have opacity 1.0, 0 otherwise
 *
 * first set the names to 1.0 and then the cut site regions (without the name) to 0.5
 */
const hoverCutSite = (className: string, on = false) => {
  let elements = document.getElementsByClassName(`${className}-name`);
  for (let i = 0; i < elements.length; i += 1) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'style' does not exist on type 'Element'.
    elements[i].style.fillOpacity = on ? 1.0 : 0.8;
  }
  elements = document.getElementsByClassName(className);
  for (let i = 0; i < elements.length; i += 1) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'style' does not exist on type 'Element'.
    elements[i].style.fillOpacity = on ? 0.5 : 0;
  }
};

/**
 * CutSites
 *
 * a component shown above the sequence viewer that shows the name of the
 * enzyme that has a cut-site within the sequence and a line for the resulting cutsite
 */
const CutSites = (props: {
  zoom: { linear: number };
  cutSiteRows: ICutSite[];
  findXAndWidth: FindXAndWidthType;
  lineHeight: number;
  firstBase: number;
  lastBase: number;
  inputRef: InputRefFuncType;
  yDiff: number;
}) => {
  const {
    zoom: { linear: zoom },
    cutSiteRows,
    findXAndWidth,
    lineHeight,
    firstBase,
    lastBase,
    inputRef,
    yDiff,
  } = props;

  const recogContiguous = (start: number, end: number, first: number, last: number) => {
    if ((start < first && end < first) || (start > last && end > last)) return true;
    if (end >= start) {
      return end < last && start > first;
    }
    return start < last && end > first;
  };

  const sitesWithX: ConnectorType[] = cutSiteRows.map((c: ICutSite) => {
    const { x: cutX } = findXAndWidth(c.fcut, c.fcut);
    const { x: hangX } = findXAndWidth(c.rcut, c.rcut);
    let { x: highlightX, width: highlightWidth } = findXAndWidth(c.recogStart, c.recogEnd);
    if (recogContiguous(c.recogStart, c.recogEnd, firstBase, lastBase)) {
      if (c.recogStart > c.recogEnd) {
        ({ x: highlightX, width: highlightWidth } = findXAndWidth(
          c.recogEnd < firstBase ? lastBase : Math.min(lastBase, c.recogEnd),
          c.recogStart > lastBase ? firstBase : Math.max(firstBase, c.recogStart)
        ));
      } else if (c.recogEnd > c.recogStart) {
        ({ x: highlightX, width: highlightWidth } = findXAndWidth(
          c.recogStart < firstBase ? lastBase : Math.min(lastBase, c.recogStart),
          c.recogEnd > lastBase ? firstBase : Math.max(firstBase, c.recogEnd)
        ));
      }
    }
    return {
      ...c,
      cutX,
      hangX,
      highlightX,
      highlightWidth,
      recogStrand: c.recogStrand,
      highlightColor: c.highlightColor,
    };
  });

  const groupedSitesWithX: GroupedConnector[] = [];
  sitesWithX.forEach((site: ConnectorType) => {
    const overlapIndex = groupedSitesWithX.findIndex(potentialOverlap => {
      return Math.abs(potentialOverlap.startX - site.start) < 10;
    });
    if (overlapIndex > -1) {
      groupedSitesWithX[overlapIndex].sites.push(site);
      groupedSitesWithX[overlapIndex].startX = Math.min(site.start, groupedSitesWithX[overlapIndex].startX);
      groupedSitesWithX[overlapIndex].endX = Math.max(site.end, groupedSitesWithX[overlapIndex].endX);
      return groupedSitesWithX;
    }

    return groupedSitesWithX.push({
      sites: [site],
      startX: site.start,
      endX: site.end,
    });
  });
  console.table(groupedSitesWithX);
  if (!sitesWithX.length) return null;

  const getConnectorXAndWidth = (c: ConnectorType, sequenceCutSite: boolean, complementCutSite: boolean) => {
    if (sequenceCutSite && complementCutSite) {
      return {
        x: Math.min(c.cutX, c.hangX),
        width: Math.abs(c.hangX - c.cutX),
      };
    }
    if (sequenceCutSite) {
      if (c.start + c.cutX > c.end + c.hangX) {
        return findXAndWidth(firstBase, c.fcut);
      }
      if (c.fcut > c.rcut) return findXAndWidth(firstBase, c.fcut);
      return findXAndWidth(c.fcut, lastBase);
    }
    if (complementCutSite) {
      if (c.start + c.cutX > c.end + c.hangX) {
        return findXAndWidth(c.rcut, lastBase);
      }
      if (c.fcut > c.rcut) return findXAndWidth(c.rcut, lastBase);
      return findXAndWidth(firstBase, c.rcut);
    }
    return { x: 0, width: 0 };
  };

  const textProps = {
    dominantBaseline: "inherit",
    textAnchor: "start",
    y: yDiff,
  };

  return (
    <g className="la-vz-cut-sites">
      {groupedSitesWithX.map((group: GroupedConnector) => {
        // prevent double rendering, by placing the indices only in the seqBlock
        // that they need to be shown. Important for the zero-index edge case
        return (
          <GroupedConnector
            key={JSON.stringify(group)}
            group={group}
            firstBase={firstBase}
            lastBase={lastBase}
            getConnectorXAndWidth={getConnectorXAndWidth}
            textProps={textProps}
            zoom={zoom}
            lineHeight={lineHeight}
            yDiff={yDiff}
            inputRef={inputRef}
            findXAndWidth={findXAndWidth}
          />
        );
      })}
    </g>
  );
};

const HighlightBlock = (props: {
  connector: ConnectorType;
  id: string | undefined;
  start: number;
  end: number;
  findXAndWidth: FindXAndWidthType;
  indexYDiff: number;
  color: string;
  direction: 1 | -1;
}) => {
  const HEIGHT = 18;
  const { id, start, end, findXAndWidth, indexYDiff, color, direction } = props;
  const { x, width } = findXAndWidth(start, end);
  /* direction = 1 -> top strand */
  let y = indexYDiff - HEIGHT / 2; // template row result
  /* direction = 1 -> bottom strand */
  if (direction == -1) {
    y = indexYDiff + HEIGHT / 2;
  }

  return (
    <rect
      key={id}
      id={id}
      x={x - 1}
      y={y}
      width={width}
      style={{
        height: 18,
        stroke: "rgba(0, 0, 0, 0.5)",
        cursor: "pointer",
        strokeWidth: 1,
        fill: color,
      }}
    />
  );
};

export default CutSites;

const CutSiteLabel = (props: {
  textProps: { dominantBaseline: string; textAnchor: string; y: number };
  connector: ConnectorType;
}) => {
  const { textProps, connector } = props;
  return (
    <text
      {...textProps}
      id={connector.id}
      className={`la-vz-cut-site-text ${connector.id}-name`}
      x={connector.cutX}
      style={{
        cursor: "pointer",
        fill: "rgb(51, 51, 51)",
        fillOpacity: 0.8,
      }}
      onMouseOver={() => hoverCutSite(connector.id, true)}
      onMouseOut={() => hoverCutSite(connector.id, false)}
      onFocus={() => 0}
      onBlur={() => 0}
    >
      {connector.name}
    </text>
  );
};

function renderConnector(props: {
  connector: ConnectorType;
  firstBase: number;
  lastBase: number;
  getConnectorXAndWidth: (
    c: ConnectorType,
    sequenceCutSite: boolean,
    complementCutSite: boolean
  ) => { x: number; width: number };
  textProps: { dominantBaseline: string; textAnchor: string; y: number };
  zoom: number;
  lineHeight: number;
  yDiff: number;
  inputRef: InputRefFuncType;
  findXAndWidth: FindXAndWidthType;
  collapsed: boolean;
}) {
  const {
    connector,
    firstBase,
    lastBase,
    getConnectorXAndWidth,
    textProps,
    zoom,
    lineHeight,
    yDiff,
    inputRef,
    findXAndWidth,
    collapsed,
  } = props;
  const sequenceCutSite = connector.fcut >= firstBase && connector.fcut < lastBase;
  const complementCutSite = connector.rcut >= firstBase && connector.rcut < lastBase;
  const showIndex = sequenceCutSite || complementCutSite;

  const { x: connectorX, width: connectorWidth } = getConnectorXAndWidth(connector, sequenceCutSite, complementCutSite);
  return (
    <React.Fragment key={`la-vz-${connector.id}-first-base`}>
      {sequenceCutSite && !collapsed && <CutSiteLabel textProps={textProps} connector={connector} />}
      {zoom > 10 && (
        <rect
          width={connector.highlightWidth}
          height={lineHeight * 2}
          x={connector.highlightX}
          y={yDiff + 6}
          strokeDasharray="4,5"
          style={{
            stroke: "rgb(150,150,150)",
            strokeWidth: 1,
            fill: "rgb(255, 165, 0, 0.3)",
            fillOpacity: 0,
          }}
          className={connector.id}
          ref={inputRef(connector.id, {
            id: connector.id,
            start: connector.start,
            end: connector.end,
            type: "ENZYME",
            element: null,
          })}
        />
      )}
      {sequenceCutSite ? (
        <rect width="1px" height={lineHeight} x={connector.cutX - 0.5} y={lineHeight / 4 + yDiff} />
      ) : null}
      {showIndex && zoom > 10 ? (
        <rect width={connectorWidth} height="1px" x={connectorX - 0.5} y={lineHeight * 1.25 + yDiff} />
      ) : null}
      {complementCutSite && zoom > 10 ? (
        <rect width="1px" height={lineHeight + 1.5} x={connector.hangX - 0.5} y={lineHeight * 1.25 + yDiff} />
      ) : null}
      {connector.highlightColor && (
        <>
          <HighlightBlock
            connector={connector}
            id={connector.id}
            start={connector.start}
            end={connector.end}
            indexYDiff={yDiff + lineHeight - 5}
            findXAndWidth={findXAndWidth}
            color={connector.highlightColor}
            direction={connector.recogStrand}
          />
        </>
      )}
    </React.Fragment>
  );
}

function GroupedConnector(props: {
  group: GroupedConnector;
  firstBase: number;
  lastBase: number;
  getConnectorXAndWidth: (
    c: ConnectorType,
    sequenceCutSite: boolean,
    complementCutSite: boolean
  ) => { x: number; width: number };
  textProps: { dominantBaseline: string; textAnchor: string; y: number };
  zoom: number;
  lineHeight: number;
  yDiff: number;
  inputRef: InputRefFuncType;
  findXAndWidth: FindXAndWidthType;
}) {
  const {
    group,
    firstBase,
    lastBase,
    getConnectorXAndWidth,
    textProps,
    zoom,
    lineHeight,
    yDiff,
    inputRef,
    findXAndWidth,
  } = props;

  const labelsAreCollapsed = group.sites.length > 1;

  const groupedConnectors = group.sites.map(connector => {
    return renderConnector({
      connector,
      firstBase,
      lastBase,
      getConnectorXAndWidth,
      textProps,
      zoom,
      lineHeight,
      yDiff,
      inputRef,
      findXAndWidth,
      collapsed: labelsAreCollapsed,
    });
  });

  return (
    <>
      {labelsAreCollapsed && <CollapsedLabel connectors={group.sites} xPos={group.endX - group.startX / 2} yPos={50} />}
      {groupedConnectors}
    </>
  );
}

const CollapsedLabel = (props: { connectors: ConnectorType[]; xPos: number; yPos: number }) => {
  const { connectors } = props;
  const [hovered, setHovered] = React.useState(false);

  let text = "";
  if (connectors.length > 1) {
    if (!hovered) {
      text = `+${connectors.length}`;
    } else {
      text = connectors.map(c => c.name).join("\n");
    }
  } else {
    text = connectors[0].name || "no name provided!!";
  }

  return (
    <text onMouseLeave={() => setHovered(false)} onMouseEnter={() => setHovered(true)} className="la-vz-cut-site-text">
      {text}
    </text>
  );
};
