/* eslint-disable */

export interface IGetPokemonsResponse {
  total: number;
  pokemons: PokemonRequest[];
}

export interface PokemonRequest {
  name_clean: string;
  abilities: string[];
  stats: IPokemonStats;
  types: pokemonTypes[];
  img: string;
  name: string;
  base_experience: number;
  height: number;
  id: number;
  is_default: boolean;
  order: number;
  weight: number;
}

interface IPokemonStats {
  hp: number;
  attack: number;
  defense: number;
  'special-attack': number;
  'special-defense': number;
  speed: number;
}

export type pokemonTypes =
  | 'bug'
  | 'dark'
  | 'dragon'
  | 'electric'
  | 'fairy'
  | 'fighting'
  | 'fire'
  | 'flying'
  | 'ghost'
  | 'gosth'
  | 'grass'
  | 'ground'
  | 'ice'
  | 'normal'
  | 'poison'
  | 'psychic'
  | 'rock'
  | 'stile'
  | 'water';

const pokemonsData = {
  name_clean: 'bulbasaur',
  abilities: ['overgrow', 'chlorophyll'],
  stats: {
    hp: 45,
    attack: 49,
    defense: 49,
    'special-attack': 65,
    'special-defense': 65,
    speed: 45,
  },
  types: ['grass', 'poison'],
  img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
  name: 'bulbasaur',
  base_experience: 64,
  height: 7,
  id: 1,
  is_default: true,
  order: 1,
  weight: 69,
};

export type PokemonRequestExample = typeof pokemonsData;

export type ITypeRequest = string[];
