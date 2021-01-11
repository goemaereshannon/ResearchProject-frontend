import React from 'react';
import 'keen-slider/keen-slider.min.css';
import KeenSlider from 'keen-slider';
import PropTypes from 'prop-types';
import { useKeenSlider } from 'keen-slider/react';

import ActiveLink from '../../atoms/ActiveLink/index.js';

import styles from './Navigation.module.scss';

export default function Navigation({ variation = 'primary', size = 'm', children }) {
  const [sliderRef] = useKeenSlider({
    initial: 3.5,
    slidesPerView: 3,
    mode: 'free',
    loop: true,
    width: '100%',
  });
  return (
    <nav className={styles.main}>
      <ul className={styles.nav__small + ' keen-slider'} ref={sliderRef}>
        <li className={styles.nav__item + ' keen-slider__slide'}>
          <ActiveLink href="/" activeClassName="is-active">
            <p>
              Nieuw
              <svg xmlns="http://www.w3.org/2000/svg" width="5" height="5" viewBox="0 0 5 5" className="activity-dot">
                <circle cx="2.5" cy="2.5" r="2.5" fill="#1c1c1c" />
              </svg>
            </p>
          </ActiveLink>
        </li>
        <li className={styles.nav__item + ' keen-slider__slide'}>
          <ActiveLink href="/clothing" activeClassName="is-active">
            <p>
              Kleding
              <svg xmlns="http://www.w3.org/2000/svg" width="5" height="5" viewBox="0 0 5 5" className="activity-dot">
                <circle cx="2.5" cy="2.5" r="2.5" fill="#1c1c1c" />
              </svg>
            </p>
          </ActiveLink>
        </li>
        <li className={styles.nav__item + ' keen-slider__slide'}>
          <ActiveLink href="/accessoires" activeClassName="is-active">
            <p>
              Accessoires
              <svg xmlns="http://www.w3.org/2000/svg" width="5" height="5" viewBox="0 0 5 5" className="activity-dot">
                <circle cx="2.5" cy="2.5" r="2.5" fill="#1c1c1c" />
              </svg>
            </p>
          </ActiveLink>
        </li>
        <li className={styles.nav__item + ' keen-slider__slide'}>
          <ActiveLink href="/cosmetics" activeClassName="is-active">
            <p>
              Cosmetica
              <svg xmlns="http://www.w3.org/2000/svg" width="5" height="5" viewBox="0 0 5 5" className="activity-dot">
                <circle cx="2.5" cy="2.5" r="2.5" fill="#1c1c1c" />
              </svg>
            </p>
          </ActiveLink>
        </li>
      </ul>
      <ul className={(styles.nav__large, styles.nav + ' c-nav-items')}>
        <li className={styles.nav__item}>
          <ActiveLink href="/" activeClassName="is-active">
            <p>
              Nieuw
              <svg xmlns="http://www.w3.org/2000/svg" width="5" height="5" viewBox="0 0 5 5" className="activity-dot">
                <circle cx="2.5" cy="2.5" r="2.5" fill="#1c1c1c" />
              </svg>
            </p>
          </ActiveLink>
        </li>
        <li className={styles.nav__item}>
          <ActiveLink href="/clothing" activeClassName="is-active">
            <p>
              Kleding
              <svg xmlns="http://www.w3.org/2000/svg" width="5" height="5" viewBox="0 0 5 5" className="activity-dot">
                <circle cx="2.5" cy="2.5" r="2.5" fill="#1c1c1c" />
              </svg>
            </p>
          </ActiveLink>
        </li>
        <li className={styles.nav__item}>
          <ActiveLink href="/accessoires" activeClassName="is-active">
            <p>
              Accessoires
              <svg xmlns="http://www.w3.org/2000/svg" width="5" height="5" viewBox="0 0 5 5" className="activity-dot">
                <circle cx="2.5" cy="2.5" r="2.5" fill="#1c1c1c" />
              </svg>
            </p>
          </ActiveLink>
        </li>
        <li className={styles.nav__item}>
          <ActiveLink href="/cosmetics" activeClassName="is-active">
            <p>
              Cosmetica
              <svg xmlns="http://www.w3.org/2000/svg" width="5" height="5" viewBox="0 0 5 5" className="activity-dot">
                <circle cx="2.5" cy="2.5" r="2.5" fill="#1c1c1c" />
              </svg>
            </p>
          </ActiveLink>
        </li>
      </ul>
    </nav>
  );
}
