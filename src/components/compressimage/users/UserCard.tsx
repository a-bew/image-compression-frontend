import React from 'react';
import { User } from './user';
import styles from './UserCard.module.scss';

interface Props {
  user: User;
}

const UserCard: React.FC<Props> = ({ user }) => {
  return (
    <div className={styles.userCard}>
      <p>ID: {user.id}</p>
      <p>Name: {user.name}</p>
    </div>
  );
};

export default UserCard;
