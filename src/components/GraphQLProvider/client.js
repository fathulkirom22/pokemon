import {
  ApolloClient,
  InMemoryCache,
  makeVar
} from "@apollo/client";
import { 
  CachePersistor, 
  AsyncStorageWrapper, 
} from 'apollo3-cache-persist';

const myPokemonsVar = makeVar([]);

const cache = new InMemoryCache({
  typePolicies: { 
    Query: {
      fields: { 
        my_pokemons: { 
          keyArgs: ["nickname"],
          keyFields: ["nickname"],
          merge(existing = [], incoming) {
            if(incoming.isDelete){
              return existing.filter(item => item.nickname !== incoming.nickname)
            }
            if(incoming.nickname){
              let chek = existing.find(item => item.nickname === incoming.nickname)
              if(chek){
                console.error("error: duplika nickname")
                return existing
              }
              return [...existing, incoming];
            }
            console.error("error: nickname cant null")
            return existing
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
