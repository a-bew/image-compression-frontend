import React, { useState } from 'react';
import { TableRowProps } from './Type'

const TableRow: React.FC<TableRowProps> = ({ item, index }) => {

  const isEvenRow = index % 2 === 0;
  const [isHovered, setIsHovered] = useState(false)

  // const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     const id = event.target.value;
  //     if (event.target.checked) {
  //       setSelectedTags && setSelectedTags((prevState: string[]) => [...prevState, id]);
  //     } else {
  //       setSelectedTags && setSelectedTags((prevState: string[]) =>
  //         prevState.filter((selectedId: string) => selectedId !== id)
  //       );
  //     }
  //   };

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
      <td style = {{width:'40px'}}>
        {<span> {item.downloadLinK}</span>}
      </td>

    </tr> 
  );
};


export default TableRow;