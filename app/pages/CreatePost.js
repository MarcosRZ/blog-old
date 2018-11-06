import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { Form, Button } from 'react-bootstrap';
import withMainLayout from '../HOC/withMainLayout';
import createPost from '../queries/posts/create';

class CreatePost extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      content: '',
      date: new Date(),
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

  handleFormSubmit(addPost) {
    console.log(this.state);
    addPost({ variables: { post: this.state } });
  }

  render() {
    const { title, description, content, date } = this.state;

    return (
      <Mutation mutation={createPost}>
        {(addPost, { data }) => (
          <div className="page-content">
            <h1>New Post</h1>
            <Form onSubmit={this.handleFormSubmit}>
              <Form.Group controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  name="title"
                  type="text"
                  placeholder="Enter a nice title"
                  value={title}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  name="description"
                  type="text"
                  placeholder="Short description for fast view"
                  value={description}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formContent">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  name="content"
                  as="textarea"
                  rows="3"
                  value={content}
                  onChange={this.handleInputChange}
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                onClick={event => {
                  event.preventDefault();
                  this.handleFormSubmit(addPost);
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

CreatePost.propTypes = {
  title: PropTypes.string.isRequired,
};

CreatePost.defaultProps = {};

export default withMainLayout(CreatePost);
