import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { Table, Button } from 'react-bootstrap';
import withMainLayout from '../HOC/withMainLayout';
import withData from '../apollo/withData';
import postsQuery from '../queries/posts/list';
import XLink from '../routing/Xlink';

class Posts extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log(process.browser ? 'browser' : 'server');

    return (
      <div className="page-content">
        <h1>Posts</h1>
        <Query query={postsQuery}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            return (
              <Table
                responsive
                striped
                bordered
                hover
                size="sm"
                variant="light"
              >
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {data.posts.map(({ _id, title, date }) => (
                    <tr key={_id}>
                      <td>
                        <XLink href={`/post/${_id}`}>
                          <a>{title}</a>
                        </XLink>
                      </td>
                      <td>{new Date(date).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            );
          }}
        </Query>
        <XLink href="/posts/create">
          <Button>New Post</Button>
        </XLink>
      </div>
    );
  }
}

Posts.propTypes = {
  title: PropTypes.string.isRequired,
};

Posts.defaultProps = {};

export default withData(withMainLayout(Posts));
