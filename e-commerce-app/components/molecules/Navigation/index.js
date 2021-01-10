import React from 'react';

import ActiveLink from '../../atoms/ActiveLink/index.js';

import styles from './Navigation.module.scss';

export default function Navigation() {
  return (
    <nav className={styles.main}>
      <ul className="{styles.nav}, c-nav-items">
        <li>
          <ActiveLink href="/products/search">
            <p>Nieuw</p>
          </ActiveLink>
        </li>
        <li>
          <ActiveLink href="/orders/cart">
            <p>Kleding</p>
          </ActiveLink>
        </li>
        <li>
          <ActiveLink href="/profile/favorites">
            <p>Accessoires</p>
          </ActiveLink>
        </li>
        <li>
          <ActiveLink href="/profile/profile">
            <p>Cosmetica</p>
          </ActiveLink>
        </li>
      </ul>
    </nav>
  );
}
