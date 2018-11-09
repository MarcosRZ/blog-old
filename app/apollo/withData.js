import React from 'react';
import Head from 'next/head';
import { getDataFromTree, ApolloProvider } from 'react-apollo';
import initApollo from './initApollo';
import { getComponentDisplayName } from '../utils';

export default function composedComponent(ComposedComponent) {
  class WithData extends React.Component {
    // On Server Side Rendering, WithData may run all queries before render the page.
    // Otherwise, we'll make one roundtrip to get the page, and other to solve the query.

    static async getInitialProps(ctx) {
      const apollo = initApollo();
      let composedInitialProps = {};

      if (ComposedComponent.getInitialProps) {
        composedInitialProps = await ComposedComponent.getInitialProps(ctx);
      }

      // If we're rendering in server side, await for component tree required data. (Fetch queries)
      if (!process.browser) {
        try {
          await getDataFromTree(
            <ApolloProvider client={apollo}>
              <ComposedComponent {...composedInitialProps} />
            </ApolloProvider>,
          );
        } catch (error) {
          console.error('Error while running `getDataFromTree`', error);
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();
      }

      const apolloState = apollo.cache.extract();

      return {
        ...composedInitialProps,
        apolloState,
      };
    }

    constructor(props) {
      super(props);
      this.apolloClient = initApollo(props.apolloState);
    }

    render() {
      return (
        <ApolloProvider client={this.apolloClient}>
          <ComposedComponent {...this.props} />
        </ApolloProvider>
      );
    }
  }

  WithData.displayName = `WithData(${getComponentDisplayName(
    ComposedComponent,
  )})`;

  return WithData;
}
