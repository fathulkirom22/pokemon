import { useState } from "react";
import styled from '@emotion/styled'
import { useApolloClient, useQuery } from '@apollo/client'
import { GET_MY_POKEMONS } from '../GraphQLProvider'

const Modal = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`
const ModalContent = styled.div`
  width: 500px;
  border-radius: 10px;
  background-color: #fff;
  padding-bottom: 20px;
`
const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const ModalBody = styled.div`
  padding: 10px;
`
const ModalTitle = styled.div`
  margin-left: 15px;
  font-weight: bold;
  font-size: 18px;
`
const ButtonClose = styled.div`
  font-width: bold;
  font-size: 30px;
  color: blue;
  cursor: pointer;
  margin-right: 15px;
`
const SuccessMessage = styled.div`
  text-align: center;
  font-size: 14px;
`
const InputNickname = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
`
const ErrMsg = styled.div`
  color: red;
`
const ContainerButtonOk = styled.div`
  display: flex;
  justify-content: flex-end;
`
const ButtonOk = styled.div`
  cursor: pointer;
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
`
export function ModalSuccessCatchPokemon(props){
  const client = useApolloClient()
  const [nickname, setNickname] = useState('')
  const [err, setErr] = useState('')
  const { loading, error, data } = useQuery(GET_MY_POKEMONS, {
    fetchPolicy: 'cache-only',
  })

  const stateToDefault = ()=>{
    setNickname('')
    setErr('')
  }

  const headleSubmit = ()=>{
    if(nickname){
      const duplicate = data ? data.my_pokemons.find(elm => elm.nickname === nickname) : false
      if(!duplicate){
        let new_pokemon = {
          name: props.pokemon.name,
          nickname: nickname,
          pokemon_id: props.pokemon.id,
          __typename: "my_pokemons"
        }
        client.writeQuery({ 
          query: GET_MY_POKEMONS, 
          data: {
            my_pokemons: new_pokemon
          } 
        });
        stateToDefault()
        props.onClose()
      } else {
        setErr("Duplicate nickname")
      }
    } else {
      setErr("Nickname can not null")
    }
  }

  if(!props.show) return null
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :({error.message}</p>

  return(
    <Modal>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Success</ModalTitle>
          <ButtonClose onClick={props.onClose}>&times;</ButtonClose>
        </ModalHeader>
        <ModalBody>
          <SuccessMessage>Success to catch pokemon {props.pokemon.name}, give nickname?</SuccessMessage>
          <InputNickname placeholder="Nickname" value={nickname} onChange={(e)=>setNickname(e.target.value)}/>
          <ErrMsg>{err}</ErrMsg>
          <ContainerButtonOk>
            <ButtonOk onClick={()=>headleSubmit()}>Save</ButtonOk>
          </ContainerButtonOk>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}