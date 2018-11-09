import gql from 'graphql-tag';

export default gql`
  # POST CREATION MUTATION
  mutation($post: PostDataModel!) {
    createPost2(post: $post) {
      _id
      title
      description
      content
      date
      deletionDate
    }
  }
`;
