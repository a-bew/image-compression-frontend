import React, { useEffect, useState } from 'react';
import s from './aspectratioconfig.module.scss';
import { FeatureConfigProp } from './FeatureConfigSectionProps';

interface AspectRatioConfigProps {
  onAspectRatioChange: (preserve: boolean, width: number) => void;
  onClose: ()=>void;
  configDefaultValues: FeatureConfigProp;
}

const AspectRatioConfig: React.FC<AspectRatioConfigProps> = ({ onAspectRatioChange, onClose, configDefaultValues }) => {
  const [preserveAspectRatio, setPreserveAspectRatio] = useState(false);
  const [width, setWidth] = useState(0);

  const handleAspectRatioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setPreserveAspectRatio(isChecked);
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWidth = parseFloat(e.target.value);
    setWidth(newWidth);
    onAspectRatioChange(preserveAspectRatio, newWidth);
  };

  useEffect(()=>{
    setPreserveAspectRatio(configDefaultValues.preserveAspectRatio);
    setWidth(configDefaultValues.width);
  },[configDefaultValues.preserveAspectRatio, configDefaultValues.width])
  
  const onSubmit = ()=>{
    onAspectRatioChange(preserveAspectRatio, width);
    onClose();
  }


  return (
    <div className={s["config-container"]}>
      <div className={s['heading']}>Aspect Ratio Control:</div>
      <label>
        <input
          type="checkbox"
          checked={preserveAspectRatio}
          onChange={handleAspectRatioChange}
        />
        Preserve Aspect Ratio
      </label>
      <div className={s["width-input"]}>
        <label>Width:</label>
        <input
          type="number"
          value={width}
          onChange={handleWidthChange}
          disabled={!preserveAspectRatio}
        />
      </div>
      <div className = {s['submit-button-container']}>
        <button className={s['button']} onClick={onSubmit}>Submit</button>
      </div>

    </div>
  );
};

export default AspectRatioConfig;
