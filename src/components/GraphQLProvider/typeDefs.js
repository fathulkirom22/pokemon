import { gql } from '@apollo/client'

export const typeDefs = gql`
  extend type Query {
    myPokemons: [Pokemon]!
  }
  extend type Mutation {
    addOrRemoveMyPokemons(pokemon: Pokemon!): [Pokemon]
  }
`