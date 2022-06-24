import { useEffect, useState } from 'react';
import { GraphViewer } from '../../components/GraphViewer';
import { GraphService } from '../../services/graph.service';
import { PokemonService } from '../../services/pokemon.service';
import { StorageService } from '../../services/storage.service';
import { TrainerService } from '../../services/trainer.service';

import './styles.css';

export function Trainer() {
  const [graphData, setGraphData] = useState<any[]>([]);

  const ps = new PokemonService();
  const ts = new TrainerService();
  const gs = new GraphService(100);

  useEffect(() => {
    ts.findAllConnections().forEach(c => {
      gs.addEdge(c.trainer_name, c.pokemon_name);
    });
  }, []);

  useEffect(() => {
    const data = [] as any;
    //pokemon
    ps.findAll().forEach(p => {
      gs.bfs(StorageService.getData('username')).forEach((item, index) => {
        if (index > 0 && item === p.name) {
          data.push(GraphService.setNode(p.name, p.name, p.image));
        }
      });
    });

    //treinadores
    ts.findAll().forEach(t => {
      if (t.name === StorageService.getData('username'))
        data.push(GraphService.setNode(t.name, t.name, t.image));
    });

    // ligações
    ts.findAllConnections().forEach(c => {
      if (c.trainer_name === StorageService.getData('username')) {
        data.push(GraphService.setEdge(c.trainer_name, c.pokemon_name));
      }
    });

    setGraphData(data);
  }, []);

  return (
    <div className="backgound">
      <GraphViewer
        title={'PokeGraph'}
        graphData={graphData}
      />
    </div>
  );
}