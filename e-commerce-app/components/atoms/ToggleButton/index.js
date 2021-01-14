import styles from './ToggleButton.module.scss';
import { React, useState } from 'react';
import { useRouter } from 'next/router';

export default function ToggleButton({ title, titleTwo, pathOne, pathTwo }) {
  const [titleClass, setTitleClass] = useState('unclickedSide');
  const [titleTwoClass, setTitleTwoClass] = useState('clickedSide');
  const router = useRouter();

  const clicked = (p) => {
    if (p == title) {
      setTitleClass('clickedSide');
      setTitleTwoClass('unclickedSide');
      setTimeout(function () {
        router.push(pathOne);
      }, 300);
    }
    if (p == titleTwo) {
      setTitleClass('unclickedSide');
      setTitleTwoClass('clickedSide');
    }
  };
  return (
    <>
      <div className={styles.buttonBox}>
        <div className={titleTwoClass}>
          <label htmlFor={titleTwo} className={styles.label}>
            {titleTwo}
          </label>
          <input
            onClick={() => {
              clicked(titleTwo);
            }}
            value={titleTwo}
            type="radio"
            id={titleTwo}
            name="toggleButton"
            className={styles.toggleInput}
          />
        </div>
        <div className={titleClass}>
          <label htmlFor={title} className={styles.label}>
            {title}
          </label>
          <input
            onClick={() => {
              clicked(title);
            }}
            value={title}
            type="radio"
            id={title}
            name="toggleButton"
            className={styles.toggleInput}
          />
        </div>
      </div>

      <style jsx>
        {`
          .clickedSide {
            color: var(--white);
            background: var(--sea-green);
            box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.06);
            border-radius: 1rem;
            width: 50%;
          }

          .unclickedSide {
            color: var(--sea-green);
            background-color: transparent;
            width: 50%;
          }
        `}
      </style>
    </>
  );
}
