import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import s from './menudropdown.module.scss';
import { ItemProps, ShowDropdownMenuProp } from './Type';

interface MenuDropdownProps {
  item: ItemProps;
}
const MenuDropdown = React.memo(({item: { showDropdownMenu, setShowDropdownMenu, id }}:MenuDropdownProps) => {

    const dropdownRef = useRef<HTMLDivElement>(null);

    const [showSquareContainer, setShowSquareContainer] = useState(true);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setShowDropdownMenu((showDropdownMenu:ShowDropdownMenuProp) => {
              if (!showDropdownMenu) return { [id] : true };
              return { ...showDropdownMenu, [id]: !showDropdownMenu[id] };
            });
          }
        };
    
        document.addEventListener('mousedown', handleOutsideClick);
    
        return () => {
          document.removeEventListener('mousedown', handleOutsideClick);
        };
      }, [dropdownRef]);
  
    const handleThreeDotsClick = () => {
      setShowDropdownMenu((showDropdownMenu:ShowDropdownMenuProp) => {
        if (!showDropdownMenu) return { [id] : true };
        return { ...showDropdownMenu, [id]: !showDropdownMenu[id] };
      });
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
    // console.log("showDropdownMenu", showDropdownMenu);


  return (
    <>
    <span className={s['option-label']}>
      {showSquareContainer && <BsThreeDotsVertical className={s["three-dots-icon"]} onClick = {handleThreeDotsClick}  />}
    </span>

    {/* Dropdown menu */}

     {showDropdownMenu && showDropdownMenu[id] && (
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
})

export default MenuDropdown