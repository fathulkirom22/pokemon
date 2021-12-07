import { gql, useQuery, useMutation, useApolloClient } from '@apollo/client'
import styled from '@emotion/styled';
import {useParams}  from "react-router-dom"
import { Stat } from './Stat';
import { GET_MY_POKEMONS } from '../GraphQLProvider';

const POKEMON_LIST = gql`
  query pokemon_details($id: Int) {
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

async function HeadleCatch(client, pokemon){
  const result = Math.random() < 0.5

  if(result){
    let nickname = prompt(`Success to catch pokemon ${pokemon.name}, give nickname?`)
    if(nickname){
      // const data = client.readQuery({ query: GET_MY_POKEMONS })
      let newPokemon = {
        name: pokemon.name,
        nickname: nickname
      }
      client.writeQuery({ 
        query: GET_MY_POKEMONS, 
        data: {
          myPokemons: newPokemon
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
  const { loading, error, data } = useQuery(POKEMON_LIST, {
    variables: { id: id},
    fetchPolicy: 'cache-and-network',
  });
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :({console.log(error)}</p>;

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
      <ButtonCatch onClick={()=>HeadleCatch(client, pokemon)}>Catch</ButtonCatch>
    </div>
  )
}