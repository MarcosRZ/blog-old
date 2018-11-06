import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import typeDefs from '../graphql/schemas/typeDefs';
import resolvers from '../graphql/resolvers';
import { API_MOUNTPOINT, GRAPHQL_ENDPOINT, GRAPHIQL_ENDPOINT } from '../config';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default (app) => {
  app.use(
    `${API_MOUNTPOINT}${GRAPHIQL_ENDPOINT}`,
    graphiqlExpress({
      endpointURL: `${API_MOUNTPOINT}${GRAPHQL_ENDPOINT}`,
    }),
  );
  app.use(
    `${API_MOUNTPOINT}${GRAPHQL_ENDPOINT}`,
    graphqlExpress(req => ({
      schema,
      context: {
        user: req.user,
        sessionId: req.sessionId,
        ip: req.ip,
      },
    })),
  );
};
