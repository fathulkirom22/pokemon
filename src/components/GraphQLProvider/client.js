import {
  ApolloClient,
  InMemoryCache,
  makeVar
} from "@apollo/client";
import { 
  persistCache, 
  CachePersistor, 
  AsyncStorageWrapper, 
  LocalStorageWrapper 
} from 'apollo3-cache-persist';

const myPokemonsVar = makeVar([]);

const cache = new InMemoryCache({
  typePolicies: { // Type policy map
    Query: {
      fields: { // Field policy map for the Product type
        myPokemons: { // Field policy for the isInCart field
          keyArgs: ["nickname"],
          keyFields: ["nickname"],
          merge(existing = [], incoming) {
            let chek = existing.find(item => item.nickname === incoming.nickname)
            if(chek){
              alert("Duplika nickname")
              return existing
            }
            return [...existing, incoming];
          },
        }
      }
    }
  }
})

const persist = new CachePersistor({
  cache,
  storage: new AsyncStorageWrapper(window.localStorage),
  debug: true,
  trigger: 'write',
})

const client = new ApolloClient({
  uri: 'https://beta.pokeapi.co/graphql/v1beta',
  cache,
});

export {client, persist, cache, myPokemonsVar}
