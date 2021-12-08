import { useEffect } from 'react'
import styled from '@emotion/styled'
import { useLazyQuery, useApolloClient } from '@apollo/client'
import { GET_MY_POKEMONS } from '../GraphQLProvider'
import { useNavigate } from "react-router-dom"

const Title = styled.div`
  background: #FFFFFF;
  border: 1px solid #E0E0E0;
  box-sizing: border-box;
  border-radius: 8px;
  text-align: center;
  padding: 5px;
  margin-bottom: 20px;
`
const Grid = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-template-rows: auto auto auto; 
  justify-content: space-between;
  column-gap: 10px;
  row-gap: 20px;
`
const Card = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 104px;
  height: 112px;
  background: #FFFFFF;
  border: 1px solid #6493EB;
  box-sizing: border-box;
  border-radius: 10px;
  margin-bottom: 5px;
`
const Nickname = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
`
const Name = styled.div`
  display: flex;
  justify-content: center;
  background: #6493EB;
  border-radius: 0 0 10px 10px;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: #FFFFFF;
`
const Id = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 12px;
  color: #74CB48;
  padding: 5px;
`
const ButtonRelease = styled.div`
  cursor: pointer;
  background: #F9CF30;
  text-align: center;
  padding: 5px;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  border-radius: 10px;
`

async function headleRelease(client, pokemon){

  let newPokemon = {
    ...pokemon,
    isDelete: true
  }
  client.writeQuery({ 
    query: GET_MY_POKEMONS, 
    data: {
      my_pokemons: newPokemon
    } 
  });
}

export function MyPokemonList(){

  const client = useApolloClient()
  const [query, { loading, error, data }] = useLazyQuery(GET_MY_POKEMONS, {
    fetchPolicy: 'cache-only',
  })

  useEffect(() => {
    query()
  }, [query]);
  let navigate = useNavigate();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR: {error.message}</p>;

  return (
    <div>
      <Title>My Pokemon</Title>
      {data && data.my_pokemons.length === 0 ? (
        <p>No items in your cart</p>
      ) : (
        <Grid>
          {data && data.my_pokemons.map(pokemon => (
            <div key={pokemon.nickname}>
              <Card onClick={() => navigate(`/pokemon/${pokemon.pokemon_id}`)}>
                <Id>#{pokemon.pokemon_id}</Id>
                <Nickname>{pokemon.nickname}</Nickname>
                <Name>
                  {pokemon.name}
                </Name>
              </Card>
              <ButtonRelease onClick={()=>headleRelease(client, pokemon)}>Release</ButtonRelease>
            </div>
          ))}
        </Grid>
      )}
    </div>
  )
}