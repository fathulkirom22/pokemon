import { useState } from "react";
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'
import {useParams}  from "react-router-dom"
import { Stat } from './Stat'
import { POKEMON_DETAIL } from '../GraphQLProvider'
import { ModalFailedCatchPokemon, ModalSuccessCatchPokemon } from '../Modal'

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
export function PokemonDetail(){
  let { id } = useParams();
  const [showModalFailed, setShowModalFailed] = useState(false)
  const [showModalSuccess, setShowModalSuccess] = useState(false)
  const { loading, error, data } = useQuery(POKEMON_DETAIL, {
    variables: { id: id},
    fetchPolicy: 'cache-and-network',
  });
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :({error.message}</p>;

  const pokemon = data.species[0]

  const headleCatch = async () => {
    const result = Math.random() < 0.5
  
    if(result){
      setShowModalSuccess(true)
    } else {
      setShowModalFailed(true)
    }
  }
    
  return (
    <div>
      <ModalSuccessCatchPokemon show={showModalSuccess} pokemon={pokemon} onClose={()=> setShowModalSuccess(false)}/>
      <ModalFailedCatchPokemon show={showModalFailed} onClose={()=> setShowModalFailed(false)}/>
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
      <ButtonCatch onClick={()=>headleCatch(pokemon)}>Catch</ButtonCatch>
    </div>
  )
}