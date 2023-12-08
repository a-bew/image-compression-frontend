import React, { useEffect, useState } from 'react';
import s from './qualityoptimizationconfig.module.scss'

interface QualityOptimizationConfigProps {
  onQualityChange: (isLossless: boolean, quality: number) => void;
  onClose: ()=>void;
  configDefaultValue: number;
}

const QualityOptimizationConfig: React.FC<QualityOptimizationConfigProps> = ({
  onQualityChange,
  onClose,
  configDefaultValue
}) => {
  const [isLossless, setIsLossless] = useState(true);
  const [quality, setQuality] = useState(100);

  useEffect(()=>{
    setQuality(configDefaultValue)
  },[configDefaultValue])
  
  const onSubmit = ()=>{
    onQualityChange(isLossless, quality);
    onClose();
  }

  const handleQualityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuality = parseInt(e.target.value, 10);
    setQuality(newQuality);
    
  };

  const handleOptimizationTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isLossless = e.target.value === 'lossless';
    setIsLossless(isLossless);
    onQualityChange(isLossless, quality);
  };

  return (
    <div className={s["config-container"]}>
      <h3>Quality Optimization:</h3>
      <div className={s["optimization-type"]}>
        <label>
          <input
            type="radio"
            value="lossless"
            checked={isLossless}
            onChange={handleOptimizationTypeChange}
          />
          Lossless
        </label>
        <label>
          <input
            type="radio"
            value="lossy"
            checked={!isLossless}
            onChange={handleOptimizationTypeChange}
          />
          Lossy
        </label>
      </div>
      <div className={s["quality-slider"]}>
        <label>Image Quality:</label>
        <input
          type="range"
          min="0"
          max="100"
          value={quality}
          onChange={handleQualityChange}
        />
        <span>{quality}%</span>
      </div>
      <div className = {s['submit-button-container']}>
        <button className={s['button']} onClick={onSubmit}>Submit</button>
      </div>

    </div>
  );
};

export default QualityOptimizationConfig;
