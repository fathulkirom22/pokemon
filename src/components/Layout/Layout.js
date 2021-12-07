
import styled from '@emotion/styled'
import { Navbar } from '../Navbar';

const Container = styled.div`
  background: #E5E5E5;
  max-width: 30rem;
  min-height: 100vh;
  margin: 0 auto 0;
  padding: 0 1rem 3rem;
`

export function Layout({ children }) {
  return (
    <Container>
      <Navbar/>
      <div>{children}</div>
    </Container>
  )
}