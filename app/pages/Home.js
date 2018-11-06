import React from 'react';

import { Jumbotron, Alert, Table } from 'react-bootstrap';
import withMainLayout from '../HOC/withMainLayout';
import { APP_NAME, APP_DESCRIPTION } from '../config/app';

class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="page-content">
        <Jumbotron>
          <h1>{APP_NAME}</h1>
          <p>{APP_DESCRIPTION}</p>
          <Alert variant="info">
            <a
              target="blank"
              href="https://react-bootstrap.netlify.com/components/navbar/"
            >
              React Bootstap Docs.
            </a>
          </Alert>
        </Jumbotron>
      </div>
    );
  }
}

Home.propTypes = {};

Home.defaultProps = {};

export default withMainLayout(Home);
