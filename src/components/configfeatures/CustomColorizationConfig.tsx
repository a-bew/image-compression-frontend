import React, { useEffect, useState } from 'react';
import s from './customcolorizationconfig.module.scss'

interface CustomColorizationConfigProps {
  onColorizationChange: (colorization: string) => void;
  onClose: ()=>void;
  configDefaultValue: string;
}

const CustomColorizationConfig: React.FC<CustomColorizationConfigProps> = ({
  onColorizationChange,
  onClose,
  configDefaultValue
}) => {

  const [selectedColorization, setSelectedColorization] = useState<string>('default');

  const handleColorizationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColorization = e.target.value;
    setSelectedColorization(newColorization);
  };

  useEffect(()=>{
    setSelectedColorization(configDefaultValue)
  },[configDefaultValue])
  
  const onSubmit = ()=>{
    onColorizationChange(selectedColorization);
    onClose();
  }

  return (
    <div className={s["config-container"]}>
      <div className={s['heading']}>Custom Colorization:</div>
      <div className={s["colorization-options"]}>
        <label>
          <input
            type="radio"
            value="default"
            checked={selectedColorization === 'default'}
            onChange={handleColorizationChange}
          />
          Default
        </label>
        <label>
          <input
            type="radio"
            value="grayscale"
            checked={selectedColorization === 'grayscale'}
            onChange={handleColorizationChange}
          />
          Grayscale
        </label>
        <label>
          <input
            type="radio"
            value="2color"
            checked={selectedColorization === '2color'}
            onChange={handleColorizationChange}
          />
          2 Color
        </label>
        <label>
          <input
            type="radio"
            value="3color"
            checked={selectedColorization === '3color'}
            onChange={handleColorizationChange}
          />
          3 Color
        </label>
      </div>
      <div className = {s['submit-button-container']}>
        <button className={s['button']} onClick={onSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default CustomColorizationConfig;