import { useState, useEffect } from 'react';
import { GraphViewer } from '../../components/GraphViewer';
import { GraphService } from '../../services/graph.service';
import { PokemonService } from '../../services/pokemon.service';
import { TrainerService } from '../../services/trainer.service';

import './styles.css';

export function TrainersConnection() {
  const [graphData, setGraphData] = useState<any[]>([]);

  const ps = new PokemonService();
  const ts = new TrainerService();

  useEffect(() => {
    const data = [] as any;

    ts.findAll().forEach(t => {
      data.push(GraphService.setNode(t.name, t.name, t.image));
    });

    ts.findAllConnections().forEach(c => {
      const pokemon = ps.findByName(c.pokemon_name);
      data.push(GraphService.setNode(pokemon.name, pokemon.name, pokemon.image));

      data.push(GraphService.setEdge(c.trainer_name, c.pokemon_name));
    });

    setGraphData(data);
  }, []);

  return (
    <GraphViewer 
      title={'PokeGraph'}
      graphData={graphData}
    />
  );
}