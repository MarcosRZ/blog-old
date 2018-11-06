import React from 'react';
import PropTypes from 'prop-types';
import withMainLayout from '../HOC/withMainLayout';

class Apps extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { title } = this.props;

    return <h1>{title}</h1>;
  }
}

Apps.propTypes = {
  title: PropTypes.string.isRequired,
};

Apps.defaultProps = {};

export default withMainLayout(Apps);
