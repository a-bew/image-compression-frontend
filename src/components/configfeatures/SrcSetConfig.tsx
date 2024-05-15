import React, { useEffect, useRef, useState } from 'react';
import styles from './srcsetconfig.module.scss';
import { FeatureConfigProp } from './FeatureConfigSectionProps';
import { MdCancelPresentation, MdOutlineAddToPhotos } from "react-icons/md";
import Switch from '../misc/Switch';
import useSelectAllTextOnCtrlA from '../../hooks/useSelectAllTextOnCtrlA';

export type SrcSetOptionType = 'none' | 'standard' | 'custom';

export interface SrcSetConfigProps {
  onSrcSetImageChange: (sourceSetOption: SrcSetOptionType, sourceSets: SourceSet[]) => void;
  onClose: ()=>void;
  configDefaultValues: FeatureConfigProp;
}

  // sourceSetOption,
  // sourceSets,
  // defaultSourceSet
export interface SourceSet {
  size: string;
  width: number;
}

const SrcSetConfig: React.FC<SrcSetConfigProps> = ({ onSrcSetImageChange, onClose, configDefaultValues }) => {

  const defaultSourceSet = [
    { size: 'small', width: 300 },
    { size: 'medium', width: 600 },
    { size: 'large', width: 1200 },
  ]

  const [imageType, setImageType] = useState<string>('background');
  const [sourceSetOption, setSourceSetOption] = useState<SrcSetOptionType>('none');

  const [sourceSets, setSourceSets] = useState<SourceSet[]>(defaultSourceSet);

  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (checked: boolean) => {
    setIsChecked(checked);
  };

  const handleImageTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setImageType(event.target.value);
  };

  const handleSourceSetOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSourceSetOption(event.target.value as SrcSetOptionType);
  };

  const handleWidthChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newWidth = parseInt(event.target.value);
    const updatedSourceSets = [...sourceSets];
    updatedSourceSets[index].width = newWidth;
    setSourceSets(updatedSourceSets);
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newSize = event.target.value;
    const updatedSourceSets = [...sourceSets];
    updatedSourceSets[index].size = newSize;
    setSourceSets(updatedSourceSets);
  };

  const handleAddSourceSet = () => {
    setSourceSets([{ size: '', width: 0 }, ...sourceSets]);
  };

  const handleRemoveSourceSet = (index: number) => {
    const updatedSourceSets = [...sourceSets];
    updatedSourceSets.splice(index, 1);
    setSourceSets(updatedSourceSets);
  };

  const generateSizesAttribute = () => {
    let sizes = '';
    for (let i = 0; i < sourceSets.length; i++) {
      const maxWidth = sourceSets[i].width;
      const width = i === sourceSets.length - 1 ? '100vw' : `(max-width: ${maxWidth}px) ${Math.ceil(100 / sourceSets.length)}vw`;
      sizes += `${width}, `;
    }
    return sizes.slice(0, -2); // Remove the trailing comma and space
  };

  const generateSourceSetPreview = () => {
    return (
      `<img src="image.jpg"\n` +
      `srcset="${sourceSets.filter(({ size, width }) => size && width).map(({ size, width }) => `image-${width}w.jpg ${width}w`).join(',\n')}"\n` +
      // `sizes="(max-width: ${sourceSets[sourceSets.length - 1].width}px) 100vw"\n` +
      `sizes="${generateSizesAttribute()}"\n` +
      `alt="Description of the image">`
    );
  };

  const standardCodeSnippetRef = useRef<HTMLTextAreaElement>(null);
  const customCodeSnippetRef = useRef<HTMLTextAreaElement>(null);

  useSelectAllTextOnCtrlA(customCodeSnippetRef); // Apply the custom hook to the textareaRef

  useEffect(() => {
    // Adjust the height of the code snippet textarea when its content changes
    if (standardCodeSnippetRef.current) {
      standardCodeSnippetRef.current.style.height = 'auto';
      standardCodeSnippetRef.current.style.height = standardCodeSnippetRef.current.scrollHeight + 'px';
    }
  }, [sourceSets, sourceSetOption]);

  useEffect(() => {
    // Adjust the height of the code snippet textarea when its content changes
    if (customCodeSnippetRef.current) {
      customCodeSnippetRef.current.style.height = 'auto';
      customCodeSnippetRef.current.style.height = customCodeSnippetRef.current.scrollHeight + 'px';
    }
  }, [sourceSets, sourceSetOption, isChecked]);

  const [delay, setDelay] = useState(false);

  const onSubmit = ()=>{
    setDelay(true)
    onSrcSetImageChange(sourceSetOption, sourceSets);

    setTimeout(() => {
      setDelay(false)
      onClose();
    }, 1000)
  }

  const disabled =  sourceSetOption === 'none' || (sourceSetOption === 'custom' && sourceSets.map(({ size, width }) => size && width).every((value) => !value));

  return (
    <div className={styles["configuration-form"]}>
      <h2>Image Configuration</h2>
      <div className={styles["custom-source-set-header"]}>
        <label>Source Set Options:</label>
      </div>
<div className={styles["source-set-options"]}>
    <label>
          <input type="radio" value="standard" checked={sourceSetOption === 'standard'} onChange={handleSourceSetOptionChange} />
          Standard Source Set
        </label>
        <label>
          <input type="radio" value="custom" checked={sourceSetOption === 'custom'} onChange={handleSourceSetOptionChange} />
          Custom Source Set
        </label>
        <label>
          <input type="radio" value="none" checked={sourceSetOption === 'none'} onChange={handleSourceSetOptionChange} />
          None
        </label>

</div>
        {(sourceSetOption === 'standard' ) && (
          <div className={styles["source-set-description"]}>
            <p className={styles["source-set-description-text"]}>
              The standard source set will generate a responsive image with multiple sizes for different screen widths.
              Below is an example usage:
            </p>
            <textarea
              ref = {standardCodeSnippetRef}
              className={styles["code-snippet"]}
              readOnly
              value={`<img src="image.jpg"\nsrcset="image-300w.jpg 300w,\nimage-600w.jpg 600w,\nimage-1200w.jpg 1200w"\nsizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 100vw"\nalt="Description of the image">`}
            />
          </div>
        )}

      {( sourceSetOption === 'none') && (
          <div className={styles["source-set-description"]}>
            <p className={styles["source-set-description-text"]}>
              The standard source set will generate a responsive image with multiple sizes for different screen widths.
              Below is an example usage:
            </p>
            <textarea
              ref = {standardCodeSnippetRef}
              className={styles["code-snippet"]}
              readOnly
              value={``}
            />
          </div>
        )}


      {sourceSetOption === 'custom' && (
        <>
        
        <div className={styles["custom-source-set-header"]}>
          <label>Custom Source Set ({isChecked?"Preview":"Add"})</label>
          <span className={styles["add-source-set-button"]}>
           {!isChecked && <MdOutlineAddToPhotos size={20} onClick={handleAddSourceSet} name='Add' /> }
            <Switch checked={isChecked} onChange={handleChange} />
          </span>
        </div>

        { isChecked && (
          <div className={styles["source-set-description"]}>
            <p className={styles["source-set-description-text"]}>
              The custom source set will generate a responsive image with sizes specified by the user.
              Below is a preview of the generated image:
            </p>
            <textarea
              ref = {customCodeSnippetRef}
              className={styles["code-snippet"]}
              readOnly
              value={generateSourceSetPreview()}
            />
          </div>
        )}

        { !isChecked && sourceSets.map((sourceSet, index) => (
            <div className={styles["custom-source-set"]} key={index}>
              <div>
              <label htmlFor={`size-${index}`}>Screen Size:</label>
              <input
                type="text"
                id={`size-${index}`}
                value={sourceSet.size}
                onChange={(e) => handleSizeChange(e, index)}
              />
              </div>
              <div>
              <label htmlFor={`width-${index}`}>Width:</label>
              <input
                type="number"
                id={`width-${index}`}
                value={sourceSet.width}
                onChange={(e) => handleWidthChange(e, index)}
              />
              </div>
              
              <MdCancelPresentation onClick={() => handleRemoveSourceSet(index)} />
            </div>
          ))}
        </>
      )}
<div className = {styles['submit-button-container']}>
        <button className={styles['button']} onClick={onClose} style={{background: '#ccc', }}>Cancel</button>
        <button 
          className={`${styles['button']} 
          ${disabled ? styles['disabled'] : ''} 
        `} 
          onClick={onSubmit} 
          disabled={disabled}
        >
          {delay ? <div className={styles["spinner"]}></div> : 'Apply'}
        </button>
      </div>

    </div>
  );
};

export default SrcSetConfig;
