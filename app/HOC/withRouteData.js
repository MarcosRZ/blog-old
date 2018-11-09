import React from 'react';
import Router from '../routing/xrouter';

const withRouteData = Composed => {
  const getComponentDisplayName = Component =>
    Component.displayName || Component.name || 'Unknown';

  const WithRouteData = class extends React.PureComponent {
    render() {
      let mixedProps = { ...this.props };

      const query = Router.getQuery();

      if (query && query.url && query.url.query) {
        mixedProps = { ...mixedProps, ...query.url.query };
      }

      return <Composed {...mixedProps} />;
    }
  };

  WithRouteData.displayName = `WithRouteData(${getComponentDisplayName(
    Composed,
  )})`;

  return WithRouteData;
};

export default withRouteData;
