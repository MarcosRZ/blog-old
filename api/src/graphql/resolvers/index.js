import post from './post';
import date from './date';
import objectid from './objectid';
import host from './host';

export default {
  RootQuery: {
    ...post.query,
    ...host.query,
  },
  RootMutation: {
    ...post.mutation,
    ...host.mutation,
  },
  ...date,
  ...objectid,
  ...post.resolvers,
  ...host.resolvers,
};
