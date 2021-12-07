import logo from '../../images/logo.png';
import styled from '@emotion/styled'
import { Link, useNavigate } from "react-router-dom";

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0;
`

const Title = styled.div`
  cursor: pointer;
  display: flex;
`

const Logo = styled.img`
  margin-right: 10px;
`

const TitleName = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 32px;
  color: #212121;
`

export function Navbar(){
  let navigate = useNavigate();
  return (
    <Nav>
      <Title onClick={() => navigate(`/`)}>
        <Logo src={logo} alt="logo"/>
        <TitleName>Pokémon</TitleName>
      </Title>
      <Link to="/my-pokemon">My Pokemon</Link>
    </Nav>
  )
}