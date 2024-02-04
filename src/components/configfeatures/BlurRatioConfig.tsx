import React, { useEffect, useState } from 'react';
import s from './blurratioconfig.module.scss';
import { FeatureConfigProp } from './FeatureConfigSectionProps';

interface BlurRatioConfigProps {
  onBlurImageChange: (width: number, completeBlur: boolean) => void;
  onClose: ()=>void;
  configDefaultValues: FeatureConfigProp;
}

const BlurRatioConfig: React.FC<BlurRatioConfigProps> = ({ onBlurImageChange, onClose, configDefaultValues }) => {
  const [warningMessage, setWarningMessage] = useState<string>('');

  const [completBlurValue, setCompletBlurValue] = useState(false);
  const [width, setWidth] = useState(0);

  const handleBlurRatioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    
    setCompletBlurValue(isChecked);
    // onBlurImageChange(0, isChecked);
    setWarningMessage('');
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = parseFloat(e.target.value);

    // Ensure the value is within the range 0 to 6
    if (newValue < 0) {
      newValue = 0;
      setWarningMessage('Width cannot be less than 0.');
    } else if (newValue > 6) {
      // newValue = 6;
      setWarningMessage('Width cannot be greater than 6.');
    } else {
      setWarningMessage('');
    }

    setWidth(newValue || 0);
    onBlurImageChange(newValue, completBlurValue);
  };

  useEffect(()=>{
    setCompletBlurValue(configDefaultValues.completeBlur);
    setWidth(configDefaultValues.blurRatio);
  },[configDefaultValues.blurRatio, configDefaultValues.completeBlur])
  
  const onSubmit = ()=>{
    onBlurImageChange(completBlurValue?0:width, completBlurValue);
    onClose();
  }

  return (
    <div className={s["config-container"]}>
      <div className={s['heading']}>Image Blur:</div>
      <label>
        <input
          type="checkbox"
          checked={completBlurValue}
          onChange={handleBlurRatioChange}
        />
        Complete Blur
      </label>

      <div>
        <div className={s["width-input"]}>
          <label>Blur Ratio:</label>
          <input
            type="number"
            value={width}
            min={0}
            max={6}
            onChange={handleWidthChange}
            disabled={!!completBlurValue}
          />

        </div>
        {warningMessage && <span style={{ color: 'red', float: 'right', marginTop: 10 }}>{warningMessage}</span>}

      </div>
<div>

</div>
      <div className = {s['submit-button-container']}>
        <button className={s['button']} onClick={onClose}>Cancel</button>

        <button 
          className={`${s['button']} ${warningMessage ? s['disabled'] : ''}`} 
          onClick={onSubmit} 
          disabled={!!warningMessage}
        >Submit</button>
      </div>

    </div>
  );
};

export default BlurRatioConfig;
