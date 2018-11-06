import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import Router from '../routing/xrouter';

const withMainLayout = (LayoutContent, pageProps) => {
  const Layout = props => (
    <MainLayout {...props}>
      <LayoutContent {...props} {...pageProps} />
    </MainLayout>
  );

  Layout.getInitialProps = Router.getQuery;

  return Layout;
};

export default withMainLayout;
