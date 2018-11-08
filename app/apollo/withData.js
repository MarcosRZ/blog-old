import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import {
  ApolloProvider,
  getDataFromTree,
  renderToStringWithData,
} from 'react-apollo';
import initApollo from './initApollo';
import { getComponentDisplayName } from '../utils';
import Router from '../routing/xrouter';

let apollo;

// MUST USE THE SAME APOLLO IN THE WHOLE FILE.

export default function composedComponent(ComposedComponent) {
  class WithData extends React.Component {
    constructor(props) {
      super(props);
      this.apollo = initApollo(props.serverState);
    }

    static async getInitialProps(ctx) {
      let serverState = {};

      let composedInitialProps = Router.getQuery(ctx) || {};

      if (ComposedComponent.getInitialProps) {
        composedInitialProps = await ComposedComponent.getInitialProps(ctx);
      }

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      if (!process.browser) {
        // let apollo;
        if (ctx && ctx.req && ctx.req.headers && ctx.req.headers.cookie) {
          this.apollo = initApollo(null, { cookie: ctx.req.headers.cookie });
        } else {
          this.apollo = initApollo();
        }

        // Provide the `url` prop data in case a GraphQL query uses it
        const url = { query: ctx.query, pathname: ctx.pathname };
        try {
          // Run all GraphQL queries

          const app = (
            <ApolloProvider client={this.apollo}>
              <ComposedComponent url={url} {...composedInitialProps} />
            </ApolloProvider>
          );

          console.log('Running queries');

          await getDataFromTree(app);
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // http://dev.apollodata.com/react/api-queries.html#graphql-query-data-error
        }
        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();

        // Extract query data from the Apollo store
        serverState = {
          apollo: {
            data: this.apollo.cache.extract(),
          },
        };
      }
      return {
        serverState,
        ...composedInitialProps,
      };
    }

    render() {
      return (
        <ApolloProvider client={this.apollo}>
          <ComposedComponent {...this.props} />
        </ApolloProvider>
      );
    }
  }

  WithData.displayName = `WithData(${getComponentDisplayName(
    ComposedComponent,
  )})`;

  // WithData.getInitialProps = async function getInitialProps(ctx) {
  //   let serverState = {};

  //   let composedInitialProps = Router.getQuery(ctx) || {};

  //   if (ComposedComponent.getInitialProps) {
  //     composedInitialProps = await ComposedComponent.getInitialProps(ctx);
  //   }

  //   // Run all GraphQL queries in the component tree
  //   // and extract the resulting data
  //   if (!process.browser) {
  //     // let apollo;
  //     if (ctx && ctx.req && ctx.req.headers && ctx.req.headers.cookie) {
  //       apollo = initApollo(null, { cookie: ctx.req.headers.cookie });
  //     } else {
  //       apollo = initApollo();
  //     }

  //     // Provide the `url` prop data in case a GraphQL query uses it
  //     const url = { query: ctx.query, pathname: ctx.pathname };
  //     try {
  //       // Run all GraphQL queries

  //       const app = (
  //         <ApolloProvider client={apollo}>
  //           <ComposedComponent url={url} {...composedInitialProps} />
  //         </ApolloProvider>
  //       );

  //       console.log('Running queries');

  //       await getDataFromTree(app);
  //     } catch (error) {
  //       // Prevent Apollo Client GraphQL errors from crashing SSR.
  //       // Handle them in components via the data.error prop:
  //       // http://dev.apollodata.com/react/api-queries.html#graphql-query-data-error
  //     }
  //     // getDataFromTree does not call componentWillUnmount
  //     // head side effect therefore need to be cleared manually
  //     Head.rewind();

  //     // Extract query data from the Apollo store
  //     serverState = {
  //       apollo: {
  //         data: apollo.cache.extract(),
  //       },
  //     };
  //   }
  //   return {
  //     serverState,
  //     ...composedInitialProps,
  //   };
  // };

  WithData.propTypes = {
    // serverState: PropTypes.shape().isRequired,
  };

  return WithData;
}
