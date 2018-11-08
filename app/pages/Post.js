import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import withMainLayout from '../HOC/withMainLayout';
import postQuery from '../queries/posts/post';

class Post extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log(this.props);

    const { id } = this.props;

    return (
      <div className="page-content">
        <Query query={postQuery} variables={{ id }}>
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
                <p>Published on {new Date(post.date).toLocaleString()}</p>
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

Post.propTypes = {
  id: PropTypes.string.isRequired,
};

Post.defaultProps = {};

export default withMainLayout(Post);
