// TeamMember.tsx

import React from 'react';
import styles from './TeamMember.module.scss';

interface TeamMemberProps {
  name: string;
  role: string;
  avatarUrl?: string; // Make avatarUrl optional
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, avatarUrl }) => {
  // Generate avatar initials if avatarUrl is not provided
  const initials = name.split(' ').map(part => part.charAt(0)).join('').toUpperCase();

  return (
    <div className={styles.teamMember}>
        
      {avatarUrl ? (
        <img src={avatarUrl} alt={name} className={styles.avatar} />
      ) : (
        <div className={styles.avatar}>{initials}</div>
      )}

      <div className={styles.details}>
        <span>{name}</span>
        <span>{role}</span>
      </div>
    </div>
  );
};

export default TeamMember;
