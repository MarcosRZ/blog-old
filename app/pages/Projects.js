import React from 'react';
import PropTypes from 'prop-types';
import withMainLayout from '../HOC/withMainLayout';

class Projects extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { title } = this.props;

    return <h1>{title}</h1>;
  }
}

Projects.propTypes = {
  title: PropTypes.string.isRequired,
};

Projects.defaultProps = {};

export default withMainLayout(Projects);
