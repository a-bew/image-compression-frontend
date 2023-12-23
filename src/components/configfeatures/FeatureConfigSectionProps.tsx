import React, { Dispatch, SetStateAction } from 'react';
import ImageFormatConfig from './ImageFormatConfig';
import AspectRatioConfig from './AspectRatioConfig';
import CustomDimensionsConfig from './CustomDimensionsConfig';
import QualityOptimizationConfig from './QualityOptimizationConfig';
import CustomColorizationConfig from './CustomColorizationConfig';
import s from './featureconfigsection.module.scss';

export type FeatureConfigProp =  {
  imageFormat: string;
  preserveAspectRatio: boolean;
  width: number;
  height: number;
  quality: number;
  colorization: string;
};

interface FeatureConfigSectionProps {
  onImageFormatChange: (format: string) => void;
  onAspectRatioChange: (preserveAspectRatio: boolean, width: number) => void;
  onDimensionsChange: (width: number, height: number) => void;
  onQualityChange: (isLossless: boolean, quality: number) => void;
  onColorizationChange: (colorization: string) => void;
  featureName: string;
  setFeatureName: Dispatch<SetStateAction<string>>;
  onClose: () => void;
  configDefaultValues: FeatureConfigProp
}


const FeatureConfigSection: React.FC<FeatureConfigSectionProps> = React.memo(({
  onImageFormatChange,
  onAspectRatioChange,
  onDimensionsChange,
  onQualityChange,
  onColorizationChange,
  featureName,
  setFeatureName,
  onClose,
  configDefaultValues
}) => {

  const selectForm = (key: string)=>{
    switch (key) {
      case 'image-format':   
        return (<ImageFormatConfig 
                  onImageFormatChange={onImageFormatChange} 
                  onClose =  {onClose}
                  configDefaultValue = { configDefaultValues.imageFormat }
                />)
  
      case 'aspect-ratio':  
        return (<AspectRatioConfig 
            onAspectRatioChange={onAspectRatioChange} 
            onClose =  {onClose}
            configDefaultValues = { configDefaultValues }

          />)
  
      case 'custom-dimension':
        return (<CustomDimensionsConfig onDimensionsChange={onDimensionsChange} 
            onClose =  {onClose}
            configDefaultValues = { configDefaultValues }
        />)
  
      case 'quality-optimization':      

        return (<QualityOptimizationConfig onQualityChange={onQualityChange}
            onClose =  {onClose}
            configDefaultValue = { configDefaultValues.quality }
        />)
  
      case 'custom-color':      

      return (<CustomColorizationConfig 
          onColorizationChange={onColorizationChange} 
          onClose =  {onClose}
          configDefaultValue = { configDefaultValues.colorization }
      />)
  
      default:
        return null;
    }
  
  }
    
  return (
    <>
      {selectForm(featureName)}
    </>
  );
});

export default FeatureConfigSection;
