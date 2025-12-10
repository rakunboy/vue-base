/** Listado básico de la PokeAPI (/pokemon?limit=xx) */
export interface PokemonListResponse {
  count: number
  next: string | null
  previous: string | null
  results: PokemonListItem[]
}

/** Item básico usado en la lista */
export interface PokemonListItem {
  name: string
  url: string
}

/** Respuesta completa al consultar un Pokémon por nombre o ID */
export interface PokemonFull {
  id: number
  name: string
  height: number
  weight: number
  abilities: PokemonAbilityWrapper[]
  sprites: PokemonSprites
  types: PokemonTypeWrapper[]
  stats: PokemonStatWrapper[]
}

/** Wrapper de habilidades */
export interface PokemonAbilityWrapper {
  ability: {
    name: string
    url: string
  }
  is_hidden: boolean
  slot: number
}

/** Tipos (grass, fire, etc.) */
export interface PokemonTypeWrapper {
  slot: number
  type: {
    name: string
    url: string
  }
}

/** Stats base (HP, Attack, etc.) */
export interface PokemonStatWrapper {
  base_stat: number
  effort: number
  stat: {
    name: string
    url: string
  }
}

/** Sprites del Pokémon */
export interface PokemonSprites {
  front_default: string | null | undefined
  back_default: string | null
  front_shiny: string | null
  back_shiny: string | null
  other?: {
    'official-artwork'?: {
      front_default: string | null
    }
  }
}
