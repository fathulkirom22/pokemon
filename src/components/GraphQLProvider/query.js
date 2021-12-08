import { gql } from '@apollo/client'

const GET_MY_POKEMONS = gql`
  query my_pokemons {
    my_pokemons @client {
      nickname
      name
      pokemon_id
      isDelete 
    }
  }
`
const POKEMON_LIST = gql`
  query pokemon_list {
    species: pokemon_v2_pokemon(order_by: {name: asc}, limit: 30) {
      name
      id
    }
    my_pokemons @client {
      nickname
      name
      pokemon_id
    }
  }
`
const POKEMON_DETAIL = gql`
  query pokemon_detail($id: Int) {
    species: pokemon_v2_pokemon(where: {id: {_eq: $id}}) {
      name
      id
      stats: pokemon_v2_pokemonstats {
        base_stat
        effort
        name: pokemon_v2_stat {
          name
        }
      }
    }
  }
`
export { GET_MY_POKEMONS, POKEMON_LIST, POKEMON_DETAIL }