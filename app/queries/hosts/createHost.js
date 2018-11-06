import gql from 'graphql-tag';

export default gql`
  mutation CreateHost($host: HostDataModel) {
    createHost(host: $host) {
      OK
      error
      payload {
        _id
        name
        description
        url
        creationDate
        deletionDate
      }
    }
  }
`;
