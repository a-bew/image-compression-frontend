import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineCaretDown } from 'react-icons/ai';
// import CheckBox from './CheckBox';
import s from "./producttablemain.module.scss";
import uuid from 'react-uuid';
import { TableRowProps } from './Type';
import DownloadLink from './DownloadLink';
import ZipDownloadLink from './ZipDownloadLink';
import { RxClipboardCopy } from "react-icons/rx";
import useSelectAllTextOnCtrlA from '../../hooks/useSelectAllTextOnCtrlA';

const TableRow: React.FC<TableRowProps> = React.memo(({ item, index }) => {
  
  const isEvenRow = index % 2 === 0;
  const [isHovered, setIsHovered] = useState(false)

  return (

    <tr 

        style={{ background: isEvenRow ? '#fff' : '#f2f2f2', flex: 1, width: '100%' }}
        onMouseEnter = {()=>setIsHovered(true)} 
        onMouseLeave = {()=>setIsHovered(false)} 
    >
      <td>{index+1}</td>
      
      <td style = {{height: '40px'}} className={s['image-container']}>
          {item.uncompressedFile && <img style = {{width: '40px',}} src={(item.uncompressedFile)} alt={item.uncompressedFile} />}
      </td>

      <td style = {{height: '40px'}} className={s['image-container']}>
          {item.compressedFile && <img style = {{width: '40px', height: 55}} src={item.compressedFile} alt={item.compressedFile} />}
      </td>
      <td>
          {item.fileSize  && <span>{item.fileSize}</span>}
      </td>

      <td>
          <DownloadLink item={item} />
      </td>

      <td>
        <span className={s['menudropdown']}>
          {/* <MenuDropdown item = {item} /> */}
        </span>
      </td>
    </tr> 
  );
});

const ZipRowItem = ({ item, index, isChecked, onToggle }: any) => {

  
  const allItems: any = Object.entries({
    id: item.id,
    uncompressedFile: item.uncompressedFile,
    compressedFile: item.compressedFile,
    fileSize: item.fileSize, // in mb
    downloadLinK: item.downloadLinK,
    zipped: item.zipped,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isEvenRow = index % 2 === 0;

  const [isCopied, setIsCopied] = useState(false);

  const customCodeSnippetRef = useRef<HTMLTextAreaElement>(null);

  useSelectAllTextOnCtrlA(customCodeSnippetRef); // Apply the custom hook to the textareaRef

  useEffect(() => {
    // Adjust the height of the code snippet textarea when its content changes
    if (customCodeSnippetRef.current) {
      customCodeSnippetRef.current.style.height = 'auto';
      customCodeSnippetRef.current.style.height = customCodeSnippetRef.current.scrollHeight + 'px';
    }
  }, [item.zipped]);

  const generateSizesAttribute = () => {
    let sizes = '';
    for (let i = 0; i < item.zipped.length; i++) {
      const maxWidth = item.zipped[i].width;
      const width = i === item.zipped.length - 1 ? '100vw' : `(max-width: ${maxWidth}px) ${Math.ceil(100 / item.zipped.length)}vw`;
      sizes += `${width}, `;
    }
    return sizes.slice(0, -2); // Remove the trailing comma and space
  };

  const handleCopyToClipboard = () => {
    const sourceSetPreview = generateSourceSetPreview();

    navigator.clipboard.writeText(sourceSetPreview)
      .then(() => {
        console.log('Source set preview copied to clipboard');
        // Optionally show a success message or perform other actions upon successful copy
        setIsCopied(true);

        // Reset the visible state after 2 seconds (adjust as needed)
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      })
      .catch((error) => {
        console.error('Failed to copy source set preview to clipboard:', error);
        // Handle error, e.g., display an error message to the user
      });
  };

  const generateSourceSetPreview = () => {
    return (
      `<img src="image.jpg"\n` +
      `srcset="${item.zipped.map(({ compressedFile, width }:any) => `${compressedFile.split('/').pop()} ${width}w`).join(',\n')}"\n` +
      `sizes="${generateSizesAttribute()}"\n` +
      `alt="Description of the image">`
    );
  };


  return (
    <>
      <tr 
        /**
         * Collapsable Body Code For Asset Data (1 of 5)
         * **/
        onClick={(e) => {
          setIsOpen(!isOpen)
        }
        }
        // Hover functionalities to display or hide row menus including edit, create, etc
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        // style={{flex:1, width: '100%', background: isEvenRow ? '#fff' : '#f2f2f2', verticalAlign: 'top', position: 'relative', borderBottom:'none', alignItems: 'center' }}
        style={{border: "none", background: isEvenRow ? '#fff' : '#f2f2f2'}}
      >
            <td
              className={s['tag-tagtable-header-checkbox']}
            >{index+1}</td>

          <td>  {item.uncompressedFile && <img style = {{width: '40px'}} src={(item.uncompressedFile)} alt={item.uncompressedFile} />} </td>

        <td>  {item.compressedFile && <img style = {{width: '40px', height: 55}} src={item.compressedFile} alt={item.compressedFile} />} </td>
        <td>  {item.fileSize  && <span>{item.fileSize}</span>} </td>


        <td>          <ZipDownloadLink item={item} /></td>

<td>
<AiOutlineCaretDown size={14}
            /**
             * Collapsable Body Code For Asset Data (1 of 5)
             * **/
            onClick={() => setIsOpen(!isOpen)}
            /**
            * Cont't - Collapsable Body Code For Asset Data (2 of 5)
            * **/
            style={{
              marginLeft: 'auto',
              cursor: 'pointer',
              transform: `rotate(${isOpen ? 0 : 180}deg)`,
            }}
          />

</td>
        {/* </div> */}
      </tr>
      <tr 
      className={`${s['tag-tagtable-container']} ${s['top-line']}`} 
      >
      <td colSpan={6}

      >
        


      
        {/*Collapsable Body Code for Asset Data (4 of 5)*/}
        {isOpen && <div 
        className={`${s["tag-tagtable-form"]} 
        ${s["tag-tagtable-body-content"]}`
      }
          /**
           * Collapsable Body Code for Asset Data (5 of 5)
           * */
          style={{
            maxHeight: isOpen ? '100%' : 0,
            // overflow: 'hidden',
            transition: 'max-height 0.3s ease-out',
            background: isEvenRow ? '#fff' : '#f2f2f2',
            padding: 0,
            // margin: -10
          }}
        >
          {
            allItems.map((elem: any) => {
              const [key, value] = elem;
            
              return (
                <div key={uuid()} >
                  {/* <label className={s['tag-tagtable-label']}>{key}</label> */}


                  {key === 'zipped' && 
                    // <span className={s['tag-tagtable-input']}> </span>
                    <div >
                      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}} className={s["source-set-description"]}>
                        <p className={s["source-set-description-text"]} style={{alignSelf: 'flex-start', textAlign: 'left', width: '80%'}}>
                          The custom source set will generate a responsive image with sizes specified by the user.
                          Below is a preview of the generated image:
                        </p>

                        <span onClick={handleCopyToClipboard} className={`${s["copy-icon"]} ${isCopied ? s['copied'] : ''}`}>
                        <RxClipboardCopy size={20} />
                        </span>
                      </div>
                      
                      <textarea
                        ref = {customCodeSnippetRef}
                        className={s["code-snippet"]}
                        readOnly
                        value={generateSourceSetPreview()}
                      />
                  </div>
                  }
                </div>
              )
            })
          }
        </div>}
        

      </td>
    </tr>


    </>
  )
}


export default ZipRowItem;