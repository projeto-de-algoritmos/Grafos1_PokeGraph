import { useEffect, useState } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import { Link } from 'react-router-dom';

import graphStyles from './graph-styles';
import './styles.css';

interface GraphViewerProps {
  title: string;
  graphData: any;
}

export function GraphViewer({
  title,
  graphData,  
} : GraphViewerProps) {
  const [layoutName, setLayoutName] = useState('concentric');

  useEffect(() => {
    setLayoutName('breadthfirst');
  }, []);

  return (
    <div>
      <h1>{ title }</h1>

      <div className="graph-container">
        <CytoscapeComponent
          elements={graphData}
          className="graph-viewer"
          layout={{
            name: layoutName,
            fit: true,
            directed: true,
            padding: 50,
            animate: true,
            animationDuration: 1000,
            avoidOverlap: true,
            nodeDimensionsIncludeLabels: false,
          }}
          textureOnViewport={true}
          cy={(cy) => {
            graphData.forEach((item: any) => {
              cy.elements(`node#${item.data.id}`).css({
                "width": "40px",
                "height": "40px",
                "background-image": "url(" + item.data?.image + ")",
                "background-fit": "contain",
              });
            });
          }}
          stylesheet={graphStyles}
        />
      </div>

      <div className="text-center">
        <Link className="text-center button-goback" to="/pokemons">
          Voltar
        </Link>
      </div>
    </div>
  );
}