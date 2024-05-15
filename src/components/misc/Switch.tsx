import React from 'react';
import styles from './Switch.module.scss';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Switch: React.FC<SwitchProps> = ({ checked, onChange }) => {
    // const { color } = useCurentThem();
    const color =  "#007BFF";
  const handleToggle = () => {
    onChange(!checked);
  };

  const someStyle:any = {
    "--background": color,
  }
  return (
    <div className={styles.switch}>
      {/* <span className={styles.labelLeft}>Draft</span> */}
      <label className={styles.switchToggle}>
        <input type="checkbox" checked={checked} onChange={handleToggle}   />
        <span className={`${styles.slider} ${checked ? styles.checked : ''}`} style={someStyle} ></span>
      </label>
      {/* <span className={styles.labelRight}>Publish</span> */}
    </div>
  );
};

export default Switch;
