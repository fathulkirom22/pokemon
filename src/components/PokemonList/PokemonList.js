import { gql, useQuery } from '@apollo/client'
import styled from '@emotion/styled'
import { useNavigate } from "react-router-dom";

const POKEMON_LIST = gql`
  query pokemon_list {
    species: pokemon_v2_pokemon(order_by: {name: asc}, limit: 30) {
      name
      id
    }
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-template-rows: auto auto auto; 
  justify-content: space-between;
  column-gap: 10px;
  row-gap: 15px;
`

const Card = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 104px;
  height: 112px;
  background: #FFFFFF;
  border: 1px solid #74CB48;
  box-sizing: border-box;
  border-radius: 10px;
`

const Name = styled.div`
  display: flex;
  justify-content: center;
  background: #74CB48;
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

export function PokemonList() {
  let navigate = useNavigate();
  const { loading, error, data } = useQuery(POKEMON_LIST, {
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <Grid>
      {data.species.map(({ name, id }) => (
        <Card onClick={() => navigate(`/pokemon/${id}`)} key={id}>
          <Id>#{id}</Id>
          <Name>
            {name}
          </Name>
        </Card>
      ))}
    </Grid>
  );
}