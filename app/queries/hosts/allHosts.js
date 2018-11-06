import gql from 'graphql-tag';

export default gql`
  {
    hosts {
      _id
      name
    }
  }
`;
