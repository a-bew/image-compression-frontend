import React, {  useState } from 'react';
import { TableRowProps } from './Type'
import MenuDropdown from './MenuDropdown';
import s from './tablerow.module.scss';
import DownloadLink from './DownloadLink';

const TableRow: React.FC<TableRowProps> = React.memo(({ item, index }) => {
  
  const isEvenRow = index % 2 === 0;
  const [isHovered, setIsHovered] = useState(false)

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
          <DownloadLink item={item} />
      </td>

      <td>
        <span className={s['menudropdown']}>
          <MenuDropdown item = {item} />
        </span>
      </td>
    </tr> 
  );
});

export default TableRow;