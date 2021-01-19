import Head from 'next/head';

import Header from '../../components/organisms/Header';
import ToggleButton from '../../components/atoms/ToggleButton';

function Account() {
  return (
    <>
      <Head>
        <title>Mijn account- ByViChi</title>
      </Head>
      <Header />
      <main className="c-container">
        <img className="c-img" src="/svgs/undraw_web_shopping_dd4l.svg" alt="Tekening van meisje met dozen en webshop" />
        <ToggleButton title="Registreren" titleTwo="Inloggen" pathOne="/profile/sign-up" pathTwo="/profile/log-in"></ToggleButton>
        <p className="c-caption">Houd uw verlanglijstje bij, volg uw bestellingen op en bestel sneller door eenmalig uw gegevens in te vullen… </p>
      </main>
    </>
  );
}

export default Account;
