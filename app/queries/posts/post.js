import gql from 'graphql-tag';

export default gql`
  query($id: ID!) {
    post(id: $id) {
      _id
      title
      description
      content
      date
    }
  }
`;
