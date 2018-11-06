import React from 'react';
import PropTypes from 'prop-types';
import withMainLayout from '../HOC/withMainLayout';

class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { title } = this.props;

    return <h1>{title}</h1>;
  }
}

Login.propTypes = {
  title: PropTypes.string.isRequired,
};

Login.defaultProps = {};

export default withMainLayout(Login);
