'use strict';

import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import connectMongo from './db/db.js';
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

(async () => {
  try {
    const conn = await connectMongo();
    if (conn) {
      console.log('Connected successfully.');
    }
    const server = new ApolloServer({
      typeDefs: schemas,
      resolvers,
      //   context: async ({ req, res }) => {
      //     if (req) {
      //       const user = await checkAuth(req, res);

      //       return {
      //         req,
      //         res,
      //         user,
      //       };
      //     }
      //   },
    });

    server.applyMiddleware({ app });

    process.env.DEPLOY_ENVI = process.env.DEPLOY_ENVI || 'development';
    if (process.env.DEPLOY_ENVI === 'production') {
      console.log('prduction');
      const { default: production } = await import('./sec/production.js');
      production(app, 3000);
      // console.log('created production server');
    } else {
      console.log('localhost');
      const { default: localhost } = await import('./sec/localhost.js');
      localhost(app, 8000, 3000);
    }
  } catch (e) {
    throw e;
  }
})();
