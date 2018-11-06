import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { Table } from 'react-bootstrap';
import withMainLayout from '../HOC/withMainLayout';
import postsQuery from '../queries/posts/list';
import XLink from '../routing/Xlink';

class Hosts extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
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
      </div>
    );
  }
}

Hosts.propTypes = {
  title: PropTypes.string.isRequired,
};

Hosts.defaultProps = {};

export default withMainLayout(Hosts);
