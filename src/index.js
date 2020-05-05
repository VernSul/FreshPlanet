import { ApolloServer } from 'apollo-server-express';
import { merge } from 'lodash';
import fs from 'fs';
import express from 'express';
import { typeDefs, resolvers } from './graph';

const data_path = './src/database/data/';


const port = 8000;


const server = new ApolloServer({
  typeDefs: [...typeDefs],
  resolvers: merge(...resolvers),
});

const app = express();


server.applyMiddleware({ app, path: '/' });

// Write fixtures in db
const fixures = JSON.parse(fs.readFileSync(`${data_path}fixtures.json`));
Object.keys(fixures).forEach(x => {
  const db = JSON.parse(fs.readFileSync(`${data_path.concat(x)}.json`, 'utf-8'));
  if(!db.length){
    fs.writeFileSync(`${data_path.concat(x)}.json`, JSON.stringify(fixures[x]));
  }
});



app.listen({ port }, () =>
  console.log(`ðŸš€ Server ready at http://localhost:${port}`),
);
