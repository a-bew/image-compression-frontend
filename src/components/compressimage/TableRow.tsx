import React, { useEffect, useState } from 'react';
import DownloadButton from './DownloadButton';
import { TableRowProps } from './Type'
import RoundedLoader from './RoundedLoader';
import useCountdown from './useCountdown';
import { FcDeleteDatabase } from 'react-icons/fc';
import MenuDropdown from './MenuDropdown';
import s from './tablerow.module.scss';

const TableRow: React.FC<TableRowProps> = ({ item, index }) => {

  const isEvenRow = index % 2 === 0;
  const [isHovered, setIsHovered] = useState(false)

  const [hasStopped, setHasStopped] = useState(false);

  const onStop = ()=>{
    setHasStopped(true)
  }

  const {minutesLeft, secondsLeft} = useCountdown({id: item.id, timeLeft:item.timeLeft, setTimeLeft: item.setTimeLeft, onStop});



  return (

    <tr 
        style={{ background: isEvenRow ? '#fff' : '#f2f2f2' }}
        onMouseEnter = {()=>setIsHovered(true)} 
        onMouseLeave = {()=>setIsHovered(false)} 
    >
      <td>{index+1}</td>
      
      <td style = {{height: '40px'}}>
          {item.uncompressedFile && <img style = {{width: '40px'}} src={(item.uncompressedFile)} alt={item.uncompressedFile} />}
      </td>

      <td>
          {item.compressedFile && <img style = {{width: '40px'}} src={item.compressedFile} alt={item.compressedFile} />}
      </td>
      <td>
          {item.fileSize  && <span>{item.fileSize}</span>}
      </td>

      <td>
        {<span>
          {!item.downloadLinK ? <RoundedLoader />: 
            <span>
           { ( (parseInt(minutesLeft) === 0 && parseInt(secondsLeft) === 0) ?<FcDeleteDatabase  size = {15} /> : <span style={{display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center'}}>
                <DownloadButton url={item.downloadLinK} />
                <span >{minutesLeft}:{secondsLeft}</span>
            </span>)}
            </span>
            } 

          </span>}
      </td>

      <td>
        <span className={s['menudropdown']}>
         <MenuDropdown />
        </span>
      </td>
    </tr> 
  );
};


export default TableRow;