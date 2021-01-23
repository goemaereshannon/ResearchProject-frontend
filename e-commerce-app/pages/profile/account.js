import Head from 'next/head';
import React, { useContext, useState } from 'react';

import Header from '../../components/organisms/Header';
import ToggleButton from '../../components/atoms/ToggleButton';
import { Context } from '../../libs/context.js';

export default function Account() {
  function parseJwt(token) {
    if (!token) {
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
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }
  const [context, setContext] = useContext(Context);
  if (context) {
    parseJwt(context.token);
    return (
      <>
        <Head>
          <title>Mijn account- ByViChi</title>
        </Head>
        <Header />
        <main className="c-discover">
          <h1>Dag John!</h1>
          <div>
            <h2>Recente bestellingen</h2>
            <div className="c-prodlist-sum c-order-sum">
              <img src="" className="c-prodlist-img" />
              <div className="c-order-sum-body">
                Geplaatst: 8 januari 2021
                <br />
                Verzonden: 12 januari 2021
                <br />
                Items: 5
                <br />
                Totaal: €147,00
                <br />
              </div>
            </div>

            <p className="c-more">Toon alle</p>
          </div>
          <input value="Uitloggen" type="button" className="c-button" />
        </main>
      </>
    );
  } else {
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
}
