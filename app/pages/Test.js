import React from 'react';
import PropTypes from 'prop-types';
import withMainLayout from '../HOC/withMainLayout';

class Test extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { buat: 'defac' };
  }

  render() {
    return <p>Hola</p>;
  }
}

Test.propTypes = {};

Test.defaultProps = {};

export default withMainLayout(Test);
