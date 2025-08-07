export interface PokemonStat {
  base_stat: number
  stat: {
    name: string
  }
}

export interface PokemonType {
  type: {
    name: string
  }
}

export interface PokemonAbility {
  ability: {
    name: string
  }
}

export interface Pokemon {
  id: number
  name: string
  image: string
  types: PokemonType[]
  stats: PokemonStat[]
  height: number
  weight: number
  abilities: PokemonAbility[]
  customName: string
  customDescription: string
}
