import { Pokemon, TypeAdvantage } from "../models/pokemon.model";
import { pokemons, types, typesAdvantage } from "../utils/data";

export class PokemonService {

  findAll(): Array<Pokemon> {
    return pokemons;
  }

  findByName(name: string): Pokemon {
    const index = pokemons.findIndex(p => p.name === name);
    return (index !== -1) ? pokemons[index] : {} as Pokemon;
  }

  findAllTypes(): string[] {
    return types;
  }

  findAllTypesAdvantage(): Array<TypeAdvantage> {
    return typesAdvantage;
  }

}