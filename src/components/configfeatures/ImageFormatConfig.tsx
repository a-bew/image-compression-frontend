import React, { useEffect, useState } from 'react';
import s from './imageformatconfig.module.scss';

interface ImageFormatConfigProps {
  onImageFormatChange: (format: string) => void;
  onClose: () => void;
  configDefaultValue: string;
}

const ImageFormatConfig: React.FC<ImageFormatConfigProps> = ({ onImageFormatChange, onClose, configDefaultValue }) => {
  const [selectedFormat, setSelectedFormat] = useState('png'); // Initial format selection

  useEffect(() => {
    setSelectedFormat(configDefaultValue)
  }, [configDefaultValue])
  
  const onSubmit = ()=>{
    onImageFormatChange(selectedFormat);
    onClose();
  }

  const handleFormatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFormat = e.target.value;
    setSelectedFormat(newFormat);
  };

  return (
    <div className={s["config-container"]}>
      <div className={s['heading']}>Image Format:</div>
      <label>
        <input
          type="radio"
          value="png"
          checked={selectedFormat === 'png'}
          onChange={handleFormatChange}
        />
        PNG
      </label>
      <label>
        <input
          type="radio"
          value="jpeg"
          checked={selectedFormat === 'jpeg'}
          onChange={handleFormatChange}
        />
        JPEG
      </label>
      <label>
        <input
          type="radio"
          value="webp"
          checked={selectedFormat === 'webp'}
          onChange={handleFormatChange}
        />
        WebP
      </label>
      <div className = {s['submit-button-container']}>
        <button className={s['button']} onClick={onSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default ImageFormatConfig;
