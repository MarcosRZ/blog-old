import colors from "colors";
import bodyParser from "body-parser";
import express from "express";
// import graphqlMiddleware from './middleware/graphql';
import configureApolloServer from "./middleware/apollo-server";
import authMiddleware from "./middleware/auth";
import { PORT, API_MOUNTPOINT, isProductionEnv } from "./config";
import db from "./db";

console.log(
  colors.blue(`🏭  Enviroment is [${colors.yellow(process.env.NODE_ENV)}]`)
);

const init = async () => {
  try {
    // Connect with DB. Await connection...
    await db.start({ debug: !isProductionEnv() });

    // Configure Express HTTP Server
    const app = express();
    app.use(bodyParser.json({ limit: "1000mb" }));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(authMiddleware);

    // Apply Apollo Server middleware
    const apolloServer = configureApolloServer(
      app,
      { subscriptions: true },
      { path: API_MOUNTPOINT }
    );

    const API_PATH = `localhost:${PORT}${apolloServer.graphqlPath}`;

    // Turn on HTTP Server.
    app.listen({ port: PORT }, err => {
      if (err) throw err;
      console.log(
        colors.blue(`🛰️  API listening at [${colors.yellow(API_PATH)}]`)
      );
    });
  } catch (err) {
    console.error(colors.red(err));
  }
};

init();
