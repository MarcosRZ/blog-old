import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { Table } from 'react-bootstrap';
import withMainLayout from '../HOC/withMainLayout';
import AllHostsQuery from '../queries/hosts/allHosts';
import XLink from '../routing/Xlink';

class Hosts extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="page-content">
        <h1>Hosts</h1>
        <Query query={AllHostsQuery}>
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
                    <th>#</th>
                    <th>Name</th>
                    <th>IP</th>
                    <th>Main Domain</th>
                  </tr>
                </thead>
                <tbody>
                  {data.hosts.map(({ _id, name, ip, url, creationDate }) => (
                    <tr key={_id}>
                      <td>{_id}</td>
                      <td>{name}</td>
                      <td>{ip}</td>
                      <td>
                        <a>{url}</a>
                      </td>
                      <td>{creationDate}</td>
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
