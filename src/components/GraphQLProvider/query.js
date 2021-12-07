import { gql } from '@apollo/client'

export const GET_MY_POKEMONS = gql`
  query MyPokemons {
    myPokemons @client {
      nickname
      name
    }
  }
`