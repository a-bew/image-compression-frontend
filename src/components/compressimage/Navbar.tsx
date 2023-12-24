import React, { useState } from 'react';
import s from './navbar.module.scss';
import Hamburger from './Hamburger';
import One from '/favicon_io/favicon-16x16.png'
import useWindowDimensions from '../../hooks/useWindowDimensions';

interface NavbarProps {
  title: string;
}

const Navbar: React.FC<NavbarProps> = React.memo(({ title }) => {
  const { width:innerWidth } = useWindowDimensions();
  const [showNav, setShowNav] = useState(false);

  const handleNavToggle = () => {
    setShowNav(!showNav);
  };

  return (
    <nav className={s["navbar"]}>
      {<div className={s['nav-title-section']} style={{margin: (innerWidth <= 768 && !showNav) ? '1rem': ''}}>
        <div className={s["navbar__title"]}><img src={One} />{title}</div>
        <button className={s["navbar__toggle"]} onClick={handleNavToggle}>
          <span><Hamburger/></span>
          {/*  className={s["navbar__toggle-icon"]} */}
        </button>

      </div>}

      <ul className={`${s['navbar__list']} ${showNav ? s['navbar__list--show'] : ''} `} style={{ position: (innerWidth <= 768 && !showNav) ? 'absolute': 'static', right:10 }}>

      {innerWidth <= 768  && <div className={s['nav-title-section-second']} style={{padding: '20px 0'}}>
        <div className={s["navbar__title"]}><img src={One} />{title}</div>
         <button className={s["navbar__toggle"]} onClick={handleNavToggle}>
          <span><Hamburger/></span>
        </button> 

      </div>}
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
});

export default Navbar;