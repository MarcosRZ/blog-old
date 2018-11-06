import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { Form, Button } from 'react-bootstrap';
import withMainLayout from '../HOC/withMainLayout';
import createHost from '../queries/hosts/createHost';
import XLink from '../routing/Xlink';

class Hosts extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      ip: '',
      url: '',
      description: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleInputChange(event) {
    event.persist();
    const { target } = event;

    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [target.name]: value,
    });
  }

  handleFormSubmit(addHost) {
    console.log(this.state);
    addHost({ variables: { host: this.state } });
  }

  render() {
    const { name, ip, url, description } = this.state;

    return (
      <Mutation mutation={createHost}>
        {(addHost, { data }) => (
          <div className="page-content">
            <h1>New host ({name})</h1>
            <Form onSubmit={this.handleFormSubmit}>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="name"
                  type="text"
                  placeholder="Enter a name"
                  value={name}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formName">
                <Form.Label>IP</Form.Label>
                <Form.Control
                  name="ip"
                  type="text"
                  placeholder="Enter the host IP"
                  value={ip}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formName">
                <Form.Label>Url</Form.Label>
                <Form.Control
                  name="url"
                  type="text"
                  placeholder="Enter the host Url (if any)"
                  value={url}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  name="description"
                  as="textarea"
                  rows="3"
                  value={description}
                  onChange={this.handleInputChange}
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                onClick={event => {
                  event.preventDefault();
                  this.handleFormSubmit(addHost);
                }}
              >
                Submit
              </Button>
            </Form>
          </div>
        )}
      </Mutation>
    );
  }
}

Hosts.propTypes = {
  title: PropTypes.string.isRequired,
};

Hosts.defaultProps = {};

export default withMainLayout(Hosts);
