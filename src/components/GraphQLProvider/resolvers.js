import { GET_MY_POKEMONS } from '.';

export const resolvers = {
  Mutation: {
    addOrRemoveMyPokemons: (_, { pokemon }, { cache }) => {
      console.log(pokemon, 'ahs')
      const { myPokemons } = cache.readQuery({
        query: GET_MY_POKEMONS
      });
      const data = {
        myPokemons: myPokemons.find(p => p.id === pokemon.id)
          ? myPokemons.filter(p => p.id !== pokemon.id)
          : [...myPokemons, pokemon]
      };
      cache.writeQuery({ query: GET_MY_POKEMONS, data });
      return data.myPokemons;
    }
  }
};