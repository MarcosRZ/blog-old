import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import typeDefs from '../graphql/schemas/typeDefs';
import resolvers from '../graphql/resolvers';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default (app, serverOptions = {}, middlewareOptions = {}) => {
  const playground = {
    settings: {
      'editor.cursorShape': 'line',
    },
  };

  const apollo = new ApolloServer({ typeDefs, resolvers, ...serverOptions, playground });

  // Apollo Server
  apollo.applyMiddleware({ app, ...middlewareOptions });

  // Configure subscriptions
  if (serverOptions.subscriptions) {
    apollo.installSubscriptionHandlers(app);
  }

  return apollo;
};
