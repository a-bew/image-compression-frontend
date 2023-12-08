import React, { useEffect, useRef, useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import s from './menudropdown.module.scss';

const MenuDropdown = () => {

    const dropdownRef = useRef<HTMLDivElement>(null);

    const [showSquareContainer, setShowSquareContainer] = useState(true);
    
    const [showDropdownMenu, setShowDropdownMenu] = useState(false);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setShowDropdownMenu(false);
          }
        };
    
        document.addEventListener('mousedown', handleOutsideClick);
    
        return () => {
          document.removeEventListener('mousedown', handleOutsideClick);
        };
      }, []);
  
      const handleThreeDotsClick = () => {
          setShowDropdownMenu(!showDropdownMenu);
      };
  
    const handleEditShortcutClick = (value:string)=>{
        switch(value){
            case 'Refresh':
                break 
            case 'ImageFormat':
                break
            case 'DimAspectRatio':
                break
            case 'CompressQuality':
                break
            case 'Colorization':
                break
            case 'Remove':
                break
    
            default:
                break
        }
        handleThreeDotsClick();
    }


  return (
    <>
    
    {showSquareContainer && <BsThreeDotsVertical className={s["three-dots-icon"]} onClick = {handleThreeDotsClick}  />}                

    {/* Dropdown menu */}

     {showDropdownMenu && (
        <div className={s["dropdown-menu"]} ref={dropdownRef}>
            <div className={s["dropdown-item"]} onClick={()=>handleEditShortcutClick('Refresh')}>Refresh</div>
            <div className={s["dropdown-item"]} onClick={()=>handleEditShortcutClick('ImageFormat')}>Image Format</div>
            <div className={s["dropdown-item"]} onClick={()=>handleEditShortcutClick('DimAspectRatio')}>Dim/Aspect Ratio</div>
            <div className={s["dropdown-item"]} onClick={()=>handleEditShortcutClick('CompressQuality')}>Quality</div>
            <div className={s["dropdown-item"]} onClick={()=>handleEditShortcutClick('Colorization')}>Colorization</div>
            <div className={s["dropdown-item"]} onClick={()=>handleEditShortcutClick('Remove')}>Remove</div>
        </div>
    )}

    </>
  )
}

export default MenuDropdown