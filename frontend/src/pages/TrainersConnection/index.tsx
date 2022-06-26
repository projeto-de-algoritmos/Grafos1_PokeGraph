import { useState, useEffect } from 'react';
import { GraphViewer } from '../../components/GraphViewer';
import { GraphService } from '../../services/graph.service';
import { PokemonService } from '../../services/pokemon.service';
import { TrainerService } from '../../services/trainer.service';

import './styles.css';

export function TrainersConnection() {
  const [graphData, setGraphData] = useState<any[]>([]);
  const [isBipartite, setBipartite] = useState(false);

  const ps = new PokemonService();
  const ts = new TrainerService();
  const gs = new GraphService(100);

  useEffect(() => {
    const data = [] as any;

    ts.findAll().forEach(t => {
      data.push(GraphService.setNode(t.name, t.name, t.image));
    });

    ts.findAllConnections().forEach(c => {
      const pokemon = ps.findByName(c.pokemon_name);

      data.push(GraphService.setNode(pokemon.name, pokemon.name, pokemon.image));
      data.push(GraphService.setEdge(c.trainer_name, c.pokemon_name));

      gs.addEdge(c.trainer_name, c.pokemon_name);
    });

    setGraphData(data);
    setBipartite(gs.isBipartite(100));
  }, []);

  return (
    <>
      <h1>PokeGraph: Conexão entre os treinadores e Pokémons</h1>
      <h3 className="text-center">
        O grafo é Bipartido? {isBipartite ? 'Sim' : 'Não'}
      </h3>
    
      <GraphViewer 
        graphData={graphData}
      />
    </>
  );
}