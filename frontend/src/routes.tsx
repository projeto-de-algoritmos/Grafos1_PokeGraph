import {
  BrowserRouter,
  Routes as Switch,
  Route,
} from "react-router-dom";

import { Home } from './pages/Home';
// import { Pokemons } from "./pages/Pokemons";
// import { TrainersConnection } from "./pages/TrainersConnection";
// import { Trainer } from "./pages/Trainer";
export function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" element={<Home />} />
        {/* <Route path="/pokemons" element={<Pokemons />} />
        <Route path="/trainers-connections" element={<TrainersConnection />} />
        <Route path="/trainer" element={<Trainer />} /> */}
      </Switch>
    </BrowserRouter>
  );
}