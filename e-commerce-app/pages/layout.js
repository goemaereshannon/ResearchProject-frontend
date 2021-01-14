import Header from '../components/organisms/Header';

function Layout({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default Layout;
