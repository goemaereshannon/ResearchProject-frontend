import { React, useState } from 'react';
import Link from 'next/link';
export default function LogIn() {
  const submitForm = () => {};
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = {
    email: '',
    password: '',
  };
  return (
    <div className="mint-bg">
      <header className="c-head">
        <Link href="/profile/account">
          <img src="/svgs/arrow.svg" alt="Back arrow" />
        </Link>
        <Link href="/" className="c-logo-V">
          <img className="c-logo-V" src="/logo/logo_small.png" alt="Minimal logo V with flowers" />
        </Link>
      </header>
      <main className="c-content">
        <p className="c-discover-title c-title">Inloggen</p>
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
          <p className="c-redirect">
            Heeft u nog geen account?
            <Link href="/profile/sign-up">
              <span className="c-redirect-link">Registreer</span>
            </Link>
          </p>
          <input value="Log in" type="button" onClick={submitForm} className="c-button" />;
        </form>
      </main>
    </div>
  );
}
