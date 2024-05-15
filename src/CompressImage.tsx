import React from 'react';
import { useState } from 'react';
import s from './app.module.scss'
import FilesUpload  from './components/compressimage/FilesUpload'
import TableRow from './components/compressimage/TableRow';
import t from './components/compressimage/tablerow.module.scss';
import { ShowDropdownMenuProp, TimeProp } from './components/compressimage/Type'
import uuid from 'react-uuid'
import { copyArrayOfObjects } from './utils';
import FeatureConfigSection from './components/configfeatures/FeatureConfigSectionProps';
import Dialog from './components/customdialog/Dialog';
import { VITE_APP_BACKEND_URL } from './api/secrets';
import useNotification from './hooks/useNotification';
import useFileApiResponseDispatch from './hooks/useFileApiResponseDispatch';
import Table from './components/compressimage/Table';
import { SrcSetOptionType, SourceSet } from './components/configfeatures/SrcSetConfig';

interface FileListItem {
  id: string; 
  uncompressedFile: string;
  compressedFile: string;
  fileSize: string; // in mb
  downloadLinK: string;
  countDown: {
    minutesLeft:number;
    secondsLeft:number;
  };
}


// Define a TypeScript interface for the props
interface CompressedImageProps {
  targetDivRef: React.RefObject<HTMLDivElement>;
}

const CompressImage: React.FC<CompressedImageProps> = React.memo(({ targetDivRef }) => {

  const { setApiResponseAsync } = useFileApiResponseDispatch();
  
  const [timeLeft, setTimeLeft] = useState<TimeProp>({});

  const baseURL = VITE_APP_BACKEND_URL;

  const [fileList, setFileList] = useState<FileListItem[]>([]);

  const {  showNotification } = useNotification();

  const handleUpload = async (uploadedFiles: FileList) => {
    const formData = new FormData();
    const processingIdss:string[] = [];
    let stored:any = [];

    uploadedFiles && Array.from(Array(uploadedFiles.length).keys()).map((i)=>{

      const file = uploadedFiles.item(i);

      const id = uuid()

      if (file) {
        const url = URL.createObjectURL(file);
        // use the url
        stored.push({
          id,
          uncompressedFile: url,
          compressedFile: '',
          fileSize: `${(file.size ?? 0) / 1000000}MB`, // in mb
          downloadLinK: '',
        });

        // Append each file to the FormData object
        formData.append('files', uploadedFiles[i]);
        
        // Append id to track upload
        processingIdss.push(id);

      } else {
        // handle the case when file is null
        return null;
      }

    });

    let allFiles = [...fileList, ...stored]
    const fileListCloned:any = copyArrayOfObjects(fileList);

    await setFileList(allFiles);

    try {
      // showNotification("Test notification Test notification Test notification Test notification Test notification Test notification Test notification Test notification Test notification Test notification Test notification Test notification Test notification Test notification Test notification Test notification Test notification Test notification ", 'top-right', 'urgent')
      const params = new URLSearchParams();

      params.append('quality', quality.toString());
      params.append('imageFormat', imageFormat);
      params.append('width', width.toString());
      params.append('height', height.toString());
      params.append('color', colorization);
      params.append('aspect', preserveAspectRatio.toString());
      params.append('blurRatio', blurRatio.toString());
      params.append('completeBlur', completeBlur.toString());
      params.append('sourceSetOption', sourceSetOption);
      params.append('sourceSets', JSON.stringify(sourceSets));

      setApiResponseAsync({ loading: true, error: null, data: null });

      const url = `${baseURL}/upload/manipulate-images?${params.toString()}`;

      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload');
      }

      // Handle the response data here
      const cloned:any = copyArrayOfObjects(stored);
      const timenow: any = {}
      
      const data = await response.json();

      const willZipImages = data.willZipImages;

      if (willZipImages) {

        setSourceSetOption('none');
        setSourceSets([{ size: '', width: 0 }]);
  
        type OrderedObject = {};

        const groupedByFileName: any = [];
  
        data.files.forEach((file: any) => {
          const filename = file.compressedFile.split('/').pop();

          // Find the index of the entry in the ordered object array
          const index = groupedByFileName.findIndex((entry:any) => entry[0] === file.fileName);
          const size =  file.size;

          const updating =  {
            fileName: file.fileName,
            compressedFile: `${baseURL}/${filename}`, 
            downloadLinK: `${baseURL}/${filename}`,
            fileSize: `${cloned[0].fileSize} / ${(size ?? 0) / 1000000}MB`, // in mb  
          }

          if (index !== -1) {
            // If the fileName already exists, append the file to the existing array of files
            groupedByFileName[index][1].push({...file, ...updating});
          } else {
            // If the fileName doesn't exist, add a new entry to the ordered object
            groupedByFileName.push([file.fileName, [{...file, ...updating}]]);
          }
        });

        console.log("groupedByFileName", groupedByFileName)

            //   const {
            //     width,
            //     height,
            //     fileName:originalFileName,
            //     compressedFile,
            // }

          for (let i = 0; i < cloned.length; i++) {

            const trackedId = processingIdss[i];
  
            // const returnedIndex =  processingIdss.findIndex((id=>{
            //   return id ===  trackedId
            // }));
            const returnedIndex = processingIdss.indexOf(trackedId);

  
            const size =  data.files[returnedIndex].size;
    
            const minutes = 4; 
            const seconds = 60
        
              // const filename = data.files[returnedIndex].compressedFile.split('/').pop();
              const filename =  groupedByFileName[returnedIndex][1][0].compressedFile.split('/').pop();
              const sizeInter =  groupedByFileName[returnedIndex][1][0].size;

              timenow[processingIdss[returnedIndex]] = minutes * 60 + seconds;
                cloned[returnedIndex] = {
                  ...cloned[returnedIndex], 
                  compressedFile: `${baseURL}/${filename}`, 
                  downloadLinK: `${baseURL}/${filename}`,
                  fileSize: `${cloned[i].fileSize} / ${(sizeInter ?? 0) / 1000000}MB`, // in mb   
                  zipped: groupedByFileName[returnedIndex][1],
                }
              }

          } else {

        for (let i = 0; i < cloned.length; i++) {

          const trackedId = processingIdss[i];

          // const returnedIndex =  processingIdss.findIndex((id=>{
          //   return id ===  trackedId
          // }));
          const returnedIndex = processingIdss.indexOf(trackedId);

          const size =  data.files[returnedIndex].size;
  
          const minutes = 4; 
          const seconds = 60
      
            const filename = data.files[returnedIndex].compressedFile.split('/').pop();

            timenow[processingIdss[returnedIndex]] = minutes * 60 + seconds;
                cloned[returnedIndex] = {
                  ...cloned[returnedIndex], 
                  compressedFile: `${baseURL}/${filename}`, 
                  downloadLinK: `${baseURL}/${filename}`,
                  fileSize: `${cloned[i].fileSize} / ${(size ?? 0) / 1000000}MB`, // in mb  
                }
          }
      }

      allFiles = [...fileListCloned, ...cloned];

      await setTimeLeft({...timeLeft, ...timenow});

      setFileList(allFiles);  

      setApiResponseAsync({ loading: false, error: null, data: null });

    } catch (error:any) {

      setFileList(fileListCloned);
      const errorMessage = error.message || 'An error occurred';
      setApiResponseAsync({ loading: false, error: errorMessage, data: null })

      showNotification(errorMessage, 'top-right', 'urgent')

      setSourceSetOption('none');
      setSourceSets([{ size: '', width: 0 }]);

      // Handle the error here
      console.error(error);

    }

  };

  // State variables to hold configuration values
  const [imageFormat, setImageFormat] = useState<string>('jpeg');
  const [preserveAspectRatio, setPreserveAspectRatio] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  const [quality, setQuality] = useState<number>(100);
  const [colorization, setColorization] = useState<string>('default');
  const [blurRatio, setBlurRatio] = useState<number>(0);
  const [completeBlur, setCompleteBlur] = useState(false);
  const [sourceSetOption, setSourceSetOption] = useState<SrcSetOptionType>('none');
  const [sourceSets, setSourceSets] = useState<SourceSet[]>([{ size: '', width: 0 }]);

  const [showDropdownMenu, setShowDropdownMenu] = useState<ShowDropdownMenuProp>(null);

  const configDefaultValues = {
    imageFormat,
    preserveAspectRatio,
    width,
    height,
    quality,
    colorization,
    blurRatio,
    completeBlur
  };

  // Event handlers for configuration changes
  const handleImageFormatChange = (format: string) => {
    setImageFormat(format);
  };

  const handleAspectRatioChange = (preserve: boolean, newWidth: number) => {
    setPreserveAspectRatio(preserve);
    setWidth(newWidth);
  };

  const handleDimensionsChange = (newWidth: number, newHeight: number) => {
    // Handle the width and height changes here
    setWidth(newWidth);
    setHeight(newHeight);
  };

  const handleQualityChange = (isLossless: boolean, newQuality: number) => {
    // Handle quality changes here
    setQuality(newQuality);
  };

  const handleColorizationChange = (color: string,) => {
    setColorization(color);
  };


  const handleBlurImageChange = (ratio: number, completeBlur: boolean) => {
    setBlurRatio(ratio);
    setCompleteBlur(completeBlur);
  };

  const handleSrcSetImageChange = (sourceSetOption: SrcSetOptionType, sourceSets: SourceSet[]) => {
    // Handle the sourceSetOption and sourceSets changes here
    setSourceSetOption(sourceSetOption);
    setSourceSets(sourceSets);
      
  }
  const [isDialogOpen, setDialogOpen] = useState(false);

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const [featureName, setFeatureName] = useState('');

  const featureChangeHandle = (featureName: string)=>{
    setFeatureName(featureName)
    openDialog();
  }

  return (
    <div className = {s.container} ref={targetDivRef} >
        <div className = {s['upload-home']}>
          <div className = {s['filesupload']} style = {{marginBottom: fileList.length > 0 ? '30px': 'inherit' }}>
          <h2 style={{textAlign: 'center'}}>Drop File To Upload</h2>

              <div style={{width: '100%'}}>

                <FilesUpload  onUpload={handleUpload} maxFileSize={512000000}  />

              </div>

<div className={s['feature-metrics']}>
      <div className={s['feature-card']} onClick={() => featureChangeHandle('image-format')}>
        Image Format <span className={s['label-style']}>{imageFormat}</span>
      </div>
      <div className={s['vertical-bottom-line']}></div>

      <div className={s['feature-card']} onClick={() => featureChangeHandle('aspect-ratio')}>
        Aspect Ratio <span className={s['label-style']}>{`${preserveAspectRatio}`}</span>
      </div>
      <div className={s['vertical-bottom-line']}></div>

      <div className={s['feature-card']} onClick={() => featureChangeHandle('custom-dimension')}>
        Width: <span className={s['label-style']}>{width}</span>
      </div>
      <div className={s['vertical-bottom-line']}></div>

      <div className={s['feature-card']} onClick={() => featureChangeHandle('custom-dimension')}>
        Height: <span className={s['label-style']}>{height}</span>
      </div>
      <div className={s['vertical-bottom-line']}></div>

      <div className={s['feature-card']} onClick={() => featureChangeHandle('quality-optimization')}>
        Quality <span className={s['label-style']}>{quality}</span>
      </div>
      <div className={s['vertical-bottom-line']}></div>

      <div className={s['feature-card']} onClick={() => featureChangeHandle('custom-color')}>
        Color <span className={s['label-style']}>{colorization}</span>
      </div>

      <div className={s['feature-card']} onClick={() => featureChangeHandle('blur-image')}>
        Blur Image <span className={s['label-style']}>{completeBlur ? 'Complete' : blurRatio}</span>
      </div>

      <div className={s['feature-card']} onClick={() => featureChangeHandle('srcset-image')}>
        SrcSet <span className={s['label-style']}>{sourceSetOption}</span>
      </div>

    </div>            
          </div>
            <Table fileList={fileList} timeLeft={timeLeft} setTimeLeft={setTimeLeft} showDropdownMenu={showDropdownMenu} setShowDropdownMenu={setShowDropdownMenu} />
      </div>

      <Dialog isOpen={isDialogOpen} onClose={closeDialog}>
        <FeatureConfigSection
          configDefaultValues={configDefaultValues}
          onClose={closeDialog}
          featureName={featureName}
          setFeatureName={setFeatureName}
          onImageFormatChange={handleImageFormatChange}
          onAspectRatioChange={handleAspectRatioChange}
          onDimensionsChange={handleDimensionsChange}
          onQualityChange={handleQualityChange}
          onColorizationChange={handleColorizationChange}
          onBlurImageChange={handleBlurImageChange} 
          onSrcSetImageChange={handleSrcSetImageChange}        />
      </Dialog>
    </div>
  );
})

export default CompressImage;
