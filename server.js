'use strict';

import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import schemas from './schemas/index.js';
import resolvers from './resolvers/index.js';
import connectMongo from './db/db.js';
import cors from 'cors';
import multer from 'multer';
import { checkAuth } from './utils/checkAuth.js';
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.get('/', (req, res) => {
  console.log('Hello');
  res.send('Welcome to this file upload API :)');
});

import admin from 'firebase-admin';
import fs from 'fs';
let serviceAccount = JSON.parse(
  fs.readFileSync('./api/coffeespace-firebase.json', 'utf-8')
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'coffeespace-d0049.appspot.com',
});

let bucket = admin.storage().bucket();

const uploader = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // limiting files size to 5 MB
  },
});

// Upload endpoint to send file to Firebase storage bucket
app.post('/api/upload', uploader.single('image'), async (req, res, next) => {
  try {
    console.log(req.file);
    if (!req.file) {
      res.status(400).send('Error, could not upload file');
      return;
    }

    // Create new blob in the bucket referencing the file
    const blob = bucket.file(req.file.originalname);

    // Create writable stream and specifying file mimetype
    const blobWriter = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    blobWriter.on('error', (err) => next(err));

    blobWriter.on('finish', () => {
      // Assembling public URL for accessing the file via HTTP
      const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
        bucket.name
      }/o/${encodeURI(blob.name)}?alt=media`;

      // Return the file name and its public URL
      res
        .status(200)
        .send({ fileName: req.file.originalname, fileLocation: publicUrl });
    });

    // When there is no more data to be consumed from the stream
    blobWriter.end(req.file.buffer);
  } catch (error) {
    res.status(400).send(`Error, could not upload file: ${error}`);
    return;
  }
});
(async () => {
  try {
    const conn = await connectMongo();
    if (conn) {
      console.log('Connected successfully.');
    }
    const server = new ApolloServer({
      typeDefs: schemas,
      resolvers,
      context: async ({ req, res }) => {
        if (req) {
          const user = await checkAuth(req, res);

          return {
            req,
            res,
            user,
          };
        }
      },
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
