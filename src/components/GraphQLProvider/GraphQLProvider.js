import React, { useEffect, useState } from 'react';
import { ApolloProvider } from "@apollo/client";
import { client, persist } from "./client";

export const GraphQLProvider = ({ children }) => {
  const [newClient, setNewClient] = useState(client);

  useEffect(() => {
    async function init() {
      await persist.restore();
      setNewClient(client);
    }
    init().catch(console.error);
  }, [setNewClient]);

  return <ApolloProvider client={newClient}>{children}</ApolloProvider>;
};