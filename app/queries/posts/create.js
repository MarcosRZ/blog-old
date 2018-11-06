import gql from 'graphql-tag';

export default gql`
  # POST CREATION MUTATION
  mutation($post: PostDataModel!) {
    createPost(post: $post) {
      OK
      error
      payload {
        _id
        title
        description
        content
        date
        deletionDate
      }
    }
  }
`;
