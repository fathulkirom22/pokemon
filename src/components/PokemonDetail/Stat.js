import styled from "@emotion/styled"

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  border-bottom: 1px solid #e0e0e0;
`

const Name = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 10px;
  line-height: 16px;
  color: #74CB48;
`
const Value = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 10px;
  line-height: 16px;
`

export function Stat({name, value}){

  return(
    <Container>
      <Name>{name}</Name>
      <Value>{value}</Value>
    </Container>
  )
}