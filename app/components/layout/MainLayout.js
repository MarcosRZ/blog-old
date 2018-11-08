import React, { PureComponent } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import fetch from 'node-fetch';
import { ApolloClient } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import Header from './Header';
import Footer from './Footer';
import { APP_NAME } from '../../config/app';

class MainLayout extends PureComponent {
  constructor(props) {
    super(props);

    this.client = new ApolloClient({
      ssrMode: true,
      cache: new InMemoryCache(),
      link: createHttpLink({ uri: 'http://localhost:3001/api/graphql', fetch }),
    });
  }

  componentDidMount() {}

  toggleMenuVisibility() {
    this.setState(prevState => ({ showMenu: !prevState.showMenu }));
  }

  render() {
    const { children } = this.props;

    let { title } = this.props;

    title = `${APP_NAME} - ${title}`;

    return (
      <div id="main-layout" className="main-layout">
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, user-scalable=no"
          />
          <meta charSet="utf-8" />
          <title>{title}</title>
          <link
            rel="shortcut icon"
            type="image/x-icon"
            href="/static/images/sushi.png"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="/static/bootstrap/css/bootstrap4.min.css"
          />
          {/* <link
              rel="stylesheet"
              type="text/css"
              href="/static/bootstrap/css/bootstrap-theme.min.css"
            /> */}

          <link rel="stylesheet" type="text/css" href="/static/css/main.css" />
        </Head>

        <Header handleMenuClick={this.toggleMenuVisibility} className="" />

        {/* <Menu handleCloseClick={this.toggleMenuVisibility} /> */}

        <div className="container">{children}</div>

        <Footer />
      </div>
    );
  }
}

MainLayout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

MainLayout.defaultProps = {
  children: null,
  title: null,
};

export default MainLayout;
