import React, { useEffect, useState } from 'react';
import { ApolloProvider } from "@apollo/client";
import { client, persist, cache } from "./client";
import { GET_MY_POKEMONS } from '.';


export const GraphQLProvider = ({ children }) => {
  const [newClient, setNewClient] = useState(client);

  useEffect(() => {
    async function init() {
      await persist.restore();
      setNewClient(client);
    }
    init().catch(console.error);
  }, [persist, setNewClient]);

  // /* Initialize the local state if not yet */
  // try {
  //   newClient.readQuery({
  //     query: GET_MY_POKEMONS
  //   });
  // } catch (error) {
  //   // console.error(error)
  //   newClient.writeQuery({
  //     query: GET_MY_POKEMONS,
  //     data: {
  //       myPokemons: []
  //     }
  //   });
  // }

  return <ApolloProvider client={newClient}>{children}</ApolloProvider>;
};