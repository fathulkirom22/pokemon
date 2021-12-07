import { gql } from '@apollo/client'

export const ADD_OR_REMOVE_MY_POKEMONS = gql`
  mutation addOrRemoveMyPokemons($pokemon: Pokemon!) {
    addOrRemoveMyPokemons(pokemon: $pokemon) @client
  }
`