// Loading.js

import React from 'react';
import One from '/favicon_io/favicon-16x16.png'
import styles from './Loading.module.scss'; // Import CSS for styling

const Loading = () => {
  return (
    <div className={styles["loading-container"]}>
      <div className={styles["reflex"]}></div>
      <img src={One} className={styles["app-logo"]} alt="logo" />
    </div>
  );
}

export default Loading;
