// AboutSection.tsx
import React from 'react';
import s from './aboutsection.module.scss';
import TeamMember from './TeamMember';

const AboutSection: React.FC = React.memo(() => {
  return (
    <section className={s["about-section"]}>
      <div className={s["about-content"]}>
        <h2>About Our App</h2>
        <p>
          We are passionate about optimizing your digital experience. Our Image Compression App is designed to make your images load faster without compromising quality. We are committed to delivering the best image compression solutions.
        </p>
      </div>

      <h2>Meet Our Team</h2>

      <div className={s["team-content"]}>
        <TeamMember name={'Adetola Bewaji'} role={'Lead Developer'} />
        <TeamMember name={'Muhammad Bello'} role={'Designer'} />
        {/* Add more team members */}
      </div>
    </section>
  );
});

export default AboutSection;
