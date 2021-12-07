import { useEffect } from 'react';
import { gql, useQuery, useLazyQuery, useApolloClient } from '@apollo/client'
import { GET_MY_POKEMONS } from '../GraphQLProvider';

export function MyPokemonList(){

  const [queryCountry, { loading, error, data }] = useLazyQuery(GET_MY_POKEMONS, {
    fetchPolicy: 'cache-only',
  })

  useEffect(() => {
    queryCountry()
  }, [queryCountry]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR: {error.message}</p>;

  return (
    <div>
      <div>My Pokemon List</div>
      {data && data.myPokemons.length === 0 ? (
        <p>No items in your cart</p>
      ) : (
        <div>
          {data && data.myPokemons.map(pokemon => (
            <div key={pokemon.nickname}> {pokemon.name} {pokemon.nickname} </div>
          ))}
        </div>
      )}
    </div>
  )
}