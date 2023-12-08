import React, { useEffect, useState } from 'react';
import s from './customdimensionconfig.module.scss';
import { FeatureConfigProp } from './FeatureConfigSectionProps';


interface CustomDimensionsConfigProps {
  
  onClose: ()=>void;
  configDefaultValues: FeatureConfigProp;
  onDimensionsChange: (width: number, height: number) => void;
}

const CustomDimensionsConfig: React.FC<CustomDimensionsConfigProps> = ({ onDimensionsChange,  onClose,
  configDefaultValues: { width: defaultWidth, height: defaultHeight} }) => {
  const [width, setWidth] = useState<string>('');
  const [height, setHeight] = useState<string>('');

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWidth = e.target.value;
    setWidth(newWidth);
    // onDimensionsChange(newWidth, height);
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHeight = e.target.value;
    setHeight(newHeight);
    // onDimensionsChange(width, newHeight);
  };

  useEffect(()=>{
    setWidth(`${defaultWidth}`);
    setHeight(`${defaultHeight}`);
  },[defaultWidth, defaultHeight])
  
  const onSubmit = ()=>{
    onDimensionsChange(parseInt(width), parseInt(height));
    onClose();
  }

  return (
    <div className={s["config-container"]}>
      <div className={s['heading']}>Custom Dimensions:</div>
      <div className={s["dimension-input"]}>
        <label>Width:</label>
        <input
          type="number"
          value={width}
          onChange={handleWidthChange}
          placeholder="Enter width"
        />
      </div>
      <div className={s["dimension-input"]}>
        <label>Height:</label>
        <input
          type="number"
          value={height}
          onChange={handleHeightChange}
          placeholder="Enter height"
        />
      </div>
      <div className = {s['submit-button-container']}>
        <button className={s['button']} onClick={onSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default CustomDimensionsConfig;