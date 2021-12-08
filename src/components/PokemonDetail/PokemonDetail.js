import { useQuery, useApolloClient } from '@apollo/client'
import styled from '@emotion/styled'
import {useParams}  from "react-router-dom"
import { Stat } from './Stat'
import { GET_MY_POKEMONS, POKEMON_DETAIL } from '../GraphQLProvider'

const Card = styled.div`
  background: #74CB48;
  border-radius: 12px;
  padding: 10px;
  margin-bottom: 20px;
`
const Head = styled.div`
  display: flex;
  justify-content: space-between
`
const Name = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 32px;
  color: #FFFFFF;
  margin-bottom: 10px;
`
const Id = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 32px;
  color: #FFFFFF;
`
const Stats = styled.div`
  background: #FFFFFF;
  border-radius: 12px;
  padding: 10px
`
const ButtonCatch = styled.div`
  cursor: pointer;
  background: #F9CF30;
  text-align: center;
  padding: 10px;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  border-radius: 10px;
`

async function headleCatch(client, pokemon){
  const result = Math.random() < 0.5

  if(result){
    let nickname = prompt(`Success to catch pokemon ${pokemon.name}, give nickname?`)
    if(nickname){
      // const data = client.readQuery({ query: GET_MY_POKEMONS })
      let newPokemon = {
        name: pokemon.name,
        nickname: nickname,
        pokemon_id: pokemon.id,
        __typename: "my_pokemons"
      }
      client.writeQuery({ 
        query: GET_MY_POKEMONS, 
        data: {
          my_pokemons: newPokemon
        } 
      });
    }
  } else {
    alert('Failed to catch pokemon !!!')
  }
}

export function PokemonDetail(){
  const client = useApolloClient()
  let { id } = useParams();
  const { loading, error, data } = useQuery(POKEMON_DETAIL, {
    variables: { id: id},
    fetchPolicy: 'cache-and-network',
  });
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :({error.message}</p>;

  const pokemon = data.species[0]
    
  return (
    <div>
      <Card>
        <Head>
          <Name>{pokemon.name}</Name>
          <Id>#{id}</Id>
        </Head>
        <Stats>
          {pokemon.stats.map((stat, id) => (
            <Stat key={id} name={stat.name.name} value={stat.base_stat}/> 
          ))}
        </Stats>
      </Card>
      <ButtonCatch onClick={()=>headleCatch(client, pokemon)}>Catch</ButtonCatch>
    </div>
  )
}