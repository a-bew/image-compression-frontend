import React, { useState } from 'react';
import s from './navbar.module.scss';

interface NavbarProps {
  title: string;
}

const Navbar: React.FC<NavbarProps> = ({ title }) => {

  const [showNav, setShowNav] = useState(false);

  const handleNavToggle = () => {
    setShowNav(!showNav);
  };

  return (
    <nav className={s["navbar"]}>
      <div className={s["navbar__title"]}>{title}</div>
      <button className={s["navbar__toggle"]} onClick={handleNavToggle}>
        <span className={s["navbar__toggle-icon"]}></span>
      </button>
      <ul className={`${s['navbar__list']} ${showNav ? s['navbar__list--show'] : ''}`}>
        <li className={s["navbar__item"]}>
          <a href="#" className={s["navbar__link"]}>Home</a>
        </li>
        <li className={s["navbar__item"]}>
          <a href="#" className={s["navbar__link"]}>About</a>
        </li>
        <li className={s["navbar__item"]}>
          <a href="#" className={s["navbar__link"]}>Contact</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;