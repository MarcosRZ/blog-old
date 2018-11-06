import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { Table, Button } from 'react-bootstrap';
import withMainLayout from '../HOC/withMainLayout';
import postQuery from '../queries/posts/post';
import XLink from '../routing/Xlink';
import Router from '../routing/xrouter';

class Post extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log(this.props);
    return (
      <div className="page-content">
        <Query query={postQuery} variables={{ id: this.props.id }}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            console.log(data);

            const { post } = data;

            return (
              <div>
                <h1>{post.title}</h1>
                <h2>{post.description}</h2>
                <p>{post.content}</p>
                <p>{new Date(post.date).toLocaleString()}</p>
              </div>
            );
          }}
        </Query>

        <Button variant="primary" type="button" onClick={Router.back()}>
          Volver
        </Button>
      </div>
    );
  }
}

Post.propTypes = {
  title: PropTypes.string.isRequired,
};

Post.defaultProps = {};

export default withMainLayout(Post);
