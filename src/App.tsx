import { SeqVizSelection } from "./SeqViz/handlers/selection";
import { SeqVizProps } from "./SeqViz/SeqViz";
import { SearchResult } from "./utils/search";
import { SeqViz } from "./viewer";

/**
 * This module is only used for developing seqviz
 * See viewer.js for the library's entrypoint
 */
import React = require("react");

export const App = () => {
  const [seqvizProps] = React.useState<SeqVizProps>({
    translations: [],
    seq: "TTATGAATTCGTATGCGTTGTCCTTGGAGTATTAAGATTTCCCCCGGGGATTGTTCATGTGGGCAGGCTCAGGTTGAGGTTGAGGTTGAGGGAACTGCTGTTCCTGT",
    enzymesCustom: {
      "colliding 1": {
        rseq: "TTATGAATTCGTA", // recognition sequence
        fcut: 0, // cut index on FWD strand, relative to start of rseq
        rcut: 1, // cut index on REV strand, relative to start of rseq - pass in negative offset
      },
      "colliding 2": {
        rseq: "GAATTCGTA", // recognition sequence
        fcut: 0, // cut index on FWD strand, relative to start of rseq
        rcut: 1, // cut index on REV strand, relative to start of rseq - pass in negative offset
      },
      "colliding 3": {
        rseq: "CGTA", // recognition sequence
        fcut: 0, // cut index on FWD strand, relative to start of rseq
        rcut: 1, // cut index on REV strand, relative to start of rseq - pass in negative offset
      },
      "not colliding": {
        rseq: "CCCCCGGGGATTGTTCATG", // recognition sequence
        fcut: 0, // cut index on FWD strand, relative to start of rseq
        rcut: 1, // cut index on REV strand, relative to start of rseq - pass in negative offset
      },
    },
    enzymes: ["colliding 1", "colliding 2", "not colliding"],
    rotateOnScroll: true,
    viewer: "linear" as const,
    annotations: [
      { id: "sample annotation", color: "green", type: "enzyme", direction: 1, start: 8, end: 19, name: "test" },
    ],
    backbone: "pSB1C3",
    showAnnotations: true,
    showPrimers: true,
    showComplement: true,
    showIndex: true,
    zoom: { linear: 50, circular: 0 },
    colors: ["#8CDEBD"],
    onSelection: (selection: SeqVizSelection) => {
      console.log("SELECTION", selection);
      seqvizProps.bpColors[selection.start] = "green";
    },
    onSearch: (results: SearchResult[]) => {
      console.table(results);
    },
    bpColors: {},
    /* bpColors: {
     *   10: "green",
     *   11: "green",
     *   12: "green",
     *   200: "blue",
     *   201: "red",
     * }, */
    search: { query: "gtacc", mismatch: 0 },
    copyEvent: event => event.key === "c" && (event.metaKey || event.ctrlKey),
    style: { height: "calc(100vh - 20px)", width: "calc(100vw)" },
    highlightedRegions: [
      { start: 36, end: 66, color: "magenta" },
      { start: 70, end: 80 },
    ],
  });
  return (
    <>
      <SeqViz {...seqvizProps} />
    </>
  );
};
