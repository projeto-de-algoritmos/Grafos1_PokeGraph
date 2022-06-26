import { useEffect, useState } from 'react';
import { GraphViewer } from '../../components/GraphViewer';
import { GraphService } from '../../services/graph.service';
import { PokemonService } from '../../services/pokemon.service';
import { StorageService } from '../../services/storage.service';
import { TrainerService } from '../../services/trainer.service';

import './styles.css';

export function Trainer() {
  const [graphData, setGraphData] = useState<any[]>([]);
  const [username, setUsername] = useState(StorageService.getData('username'));
  const [layoutName, setLayoutName] = useState<any>('circle');

  const ps = new PokemonService();
  const ts = new TrainerService();
  const gs = new GraphService(100);

  const [trainers, setTrainers] = useState(ts.findAll());
  const [pokemons, setPokemons] = useState(ps.findAll());

  useEffect(() => {
    ts.findAllConnections().forEach(c => {
      gs.addEdge(c.trainer_name, c.pokemon_name);
    });

    if (layoutName === 'circle') {
      setLayoutName('breadthfirst');
    } else {
      setLayoutName('circle');
    }
  }, [username]);

  useEffect(() => {
    const data = [] as any;

    //pokemon
    pokemons.forEach(p => {
      gs.bfs(username).forEach((item, index) => {
        if (index > 0 && item === p.name) {
          data.push(GraphService.setNode(p.name, p.name, p.image));
        }
      });
    });

    //treinadores
    trainers.forEach(t => {
      if (t.name === username)
        data.push(GraphService.setNode(t.name, t.name, t.image));
    });

    // ligações
    ts.findAllConnections().forEach(c => {
      if (c.trainer_name === username) {
        data.push(GraphService.setEdge(c.trainer_name, c.pokemon_name));
      }
    });

    setGraphData(data);
  }, [username]);

  function alterUsername(event: React.ChangeEvent<HTMLSelectElement>): void {
    const username = event.target.value;
    setUsername(username);
  }

  return (
    <div className="backgound">
      <h1>PokeGraph: Conexão entre o treinador e seus Pokémons com BFS</h1>

      <div className="flex justify-center items-center trainer-select">
        <label>Selecione o treinador:</label>
        <select onChange={(event) => alterUsername(event)}>
          {
            trainers.map((trainer) => (
              <option value={trainer.name}>
                {trainer.name}
              </option>
            ))
          }
        </select>
      </div>

      <GraphViewer
        layoutName={layoutName}
        graphData={graphData}
      />
    </div>
  );
}