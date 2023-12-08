import s from './introsection.module.scss';

interface IntroSectionType {
  scrollToDiv: ()=>void;
}


const IntroSection: React.FC<IntroSectionType> = ({scrollToDiv}) => {
    return (
      <section className={s["intro-section"]}>
        <div className={s["hero"]}>
          {/* Hero content */}
        </div>
        <h1 className={s["headline"]}>
          Unlock the Power of Image Compression
        </h1>
        <p className={s["subheadline"]}>
          Optimize Your Images for Faster Loading
        </p>
        <button className={s["cta-button"]} onClick={scrollToDiv}>
          Get Started
        </button>
        <div className={s["feature-icons"]}>
          {/* Feature icons */}
        </div>
        <ul className={s["benefits"]}>
          <li>Reduce image file size</li>
          <li>Improve website performance</li>
          <li>Easy to use and fast results</li>
        </ul>
        {/* Your other content here */}
      </section>
    );
  };
  
  export default IntroSection;
  
  