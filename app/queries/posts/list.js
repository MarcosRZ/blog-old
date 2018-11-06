import gql from 'graphql-tag';

export default gql`
  {
    posts {
      _id
      title
      description
      content
      date
    }
  }
`;
