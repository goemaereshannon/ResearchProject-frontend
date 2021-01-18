import { React, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [postCode, setPostCode] = useState('');
  const [city, setCity] = useState('');
  const [page, setPage] = useState('c-content');
  const [pageTwo, setPageTwo] = useState('c-content c-two');
  const user = {
    email: '',
    password: '',
    name: '',
    firstName: '',
    street: '',
    number: 0,
    postCode: 0,
    city: '',
  };

  const submitData = () => {
    if (name) {
      if (street) {
        if (number) {
          if (postCode) {
            if (city) {
              if (firstName) {
                user.name = name;
                user.street = street;
                user.number = number;
                user.postCode = postCode;
                user.city = city;
                console.log('Gegevens correct ingevuld');
                //POST NAAR DB
              } else {
                user.firstName = '';
              }
            } else {
              console.log('Stad is verplicht');
            }
          } else {
            console.log('Postcode is verplicht');
          }
        } else {
          console.log('Huisnummer is verplicht');
        }
      } else {
        console.log('Straat is verplicht');
      }
    } else {
      console.log('Familienaam is verplicht');
    }
  };
  const submitForm = () => {
    console.log('Submit FORM');
    if (email) {
      user.email = email;
      console.log(password);
      console.log(confirmPassword);
      if (confirmPassword == password) {
        user.password = password;
        console.log('Registreren');
        setPage('c-content c-one');
        setPageTwo('c-content');
      } else {
        console.log('Wachtwoorden zijn niet gelijk');
      }
    } else {
      console.log('Geen e-mailadres ingevuld');
    }
  };
  return (
    <>
      <Head>
        <title>Registreer - By ViChi</title>
      </Head>
      <div className="mint-bg">
        <header className="c-head">
          <Link href="/profile/account">
            <img src="/svgs/arrow.svg" alt="Back arrow" />
          </Link>
          <Link href="/" className="c-logo-V">
            <img className="c-logo-V" src="/logo/logo_small.png" alt="Minimal logo V with flowers" />
          </Link>
        </header>
        <main className={page}>
          <p className="c-discover-title c-title">Registreren</p>
          <form className="c-main">
            <div className="c-inputs">
              <label htmlFor="email">E-mailadres</label>
              <img className="c-inputs-icon" src="/svgs/man-avatar.svg" alt="Avatar" />
              <input
                className="c-inputs-line"
                id="email"
                placeholder="john.doe@domain.be"
                value={email}
                onChange={(e) => {
                  console.log(e.target.value);
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="c-inputs">
              <label htmlFor="password">Wachtwoord</label>
              <img className="c-inputs-icon" src="/svgs/closed.svg" alt="Closed lock" />
              <input
                className="c-inputs-line"
                id="password"
                placeholder="********"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="c-inputs">
              <label htmlFor="confirmpassword">Wachtwoord bevestigen</label>
              <img className="c-inputs-icon" src="/svgs/key-outline.svg" alt="Key" />
              <input
                className="c-inputs-line"
                id="confirmpassword"
                placeholder="********"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </div>
            <p className="c-redirect">
              Heeft u al een account?{' '}
              <Link href="/profile/log-in">
                <span className="c-redirect-link">Log in</span>
              </Link>
            </p>
            <input value="Registreer" type="button" onClick={submitForm} className="c-button" />;
          </form>
        </main>
        <main className={pageTwo}>
          <p className="c-discover-title c-title">Gegevens</p>
          <form className="c-main">
            <div className="c-inputs">
              <label htmlFor="name">Naam</label>
              <input
                required
                className="c-inputs-box"
                id="name"
                placeholder="Doe"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="c-inputs">
              <label htmlFor="firstName">Voornaam</label>
              <input
                className="c-inputs-box"
                id="firstName"
                placeholder="John"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </div>
            <div className="c-inputs">
              <label htmlFor="street">Straat</label>
              <input
                required
                className="c-inputs-box"
                id="street"
                placeholder="Ergensstraat"
                value={street}
                onChange={(e) => {
                  setStreet(e.target.value);
                }}
              />
            </div>
            <div className="c-inputs">
              <label htmlFor="number">Nummer</label>
              <input
                required
                className="c-inputs-box "
                id="number"
                placeholder="101"
                value={number}
                onChange={(e) => {
                  setNumber(e.target.value);
                }}
              />
            </div>
            <div className="c-inputs">
              <label htmlFor="bus">Bus</label>
              <input className="c-inputs-box" id="bus" placeholder="B" />
            </div>
            <div className="c-inputs">
              <label htmlFor="postcode">Postcode</label>
              <input
                required
                className="c-inputs-box"
                id="postcode"
                placeholder="1111"
                value={postCode}
                onChange={(e) => {
                  setPostCode(e.target.value);
                }}
              />
            </div>
            <div className="c-inputs">
              <label htmlFor="city">Stad</label>
              <input
                required
                className="c-inputs-box"
                id="city"
                placeholder="Utopia"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
            </div>
            <input value="Opslaan" type="button" onClick={submitData} className="c-button" />
          </form>
        </main>
      </div>
    </>
  );
}
