const graphStyles: cytoscape.Stylesheet[] = [
  {
    selector: "node",
    style: {
      "background-color": "#fff",
      width: 120,
      height: 120,
      label: "data(label)",
      "text-halign": "center",
      "text-outline-width": "2px",
      "overlay-padding": "6px",
    },
  },
  {
    selector: "node:selected",
    style: {
      "border-width": "6px",
      "border-color": "#AAD8FF",
      "background-color": "#77828C",
      "text-outline-color": "#77828C"
    }
  },
  {
    selector: "label",
    style: {
      color: "white",
      width: 30,
      height: 30,
    }
  },
  {
    selector: "edge",
    style: {
      width: 3,
      "line-color": "#AAD8FF",
      "target-arrow-color": "#6774cb",
      "target-arrow-shape": "triangle",
      "curve-style": "bezier",
    }
  }
];

export default graphStyles;