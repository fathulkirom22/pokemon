import styled from '@emotion/styled'

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
const FailedSymbol = styled.div`
  color: red;
  text-align: center;
  font-size: 100px;  
`
const FailedMessage = styled.div`
  text-align: center;
  font-size: 14px;
`
export function ModalFailedCatchPokemon(props){
  if(!props.show){
    return null
  }
  return(
    <Modal>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Failed</ModalTitle>
          <ButtonClose onClick={props.onClose}>&times;</ButtonClose>
        </ModalHeader>
        <ModalBody>
          <FailedSymbol>&otimes;</FailedSymbol>
          <FailedMessage>Failed to catch pokemon !!!</FailedMessage>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}