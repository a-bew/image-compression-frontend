import React, { useRef } from "react";
import s from "./filesupload.module.scss";

interface FileUploadProps {
  onUpload: (files: FileList) => void;
  maxFileSize: number;
}

const FilesUpload: React.FC<FileUploadProps> = ({ onUpload, maxFileSize }) => {
  
  const dragAreaRef = useRef<HTMLDivElement>(null);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (dragAreaRef.current) {
      dragAreaRef.current.classList.add(s['drag-over']);
    }
  };

  const handleDragLeave = () => {
    if (dragAreaRef.current) {
      dragAreaRef.current.classList.remove(s['drag-over']);
    }
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files.length > 0) {
      await onUpload(event.dataTransfer.files);
    }
    if (dragAreaRef.current) {
      dragAreaRef.current.classList.remove(s['drag-over']);
    }
  };


  const handleFileSelect =async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
     await onUpload(e.target.files);
    }
  };


  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleCustomButtonClick = (): void => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      ref={dragAreaRef}
      className = {`${s['upload-container']} ${s["drag-upload-area"]}`}
    >
      <input 
        type="file" 
        accept="image/*"
        onChange={handleFileSelect} 
        ref={inputRef}
        style={{ display: 'none' }}
      />
      <div className={s['files-upload-drop-text']}>{'Drop files to upload'}</div>
      <div className={s['files-upload-or']}> or </div>
       <button  className={`${s['files-upload-select-files']}`} type="button"  onClick={handleCustomButtonClick}>
        Select Files
      </button>
      <div className={`${s['files-upload-file-size']}`}>Maximum upload file size: {maxFileSize / 1000000} MB.</div>
    </div>
  );
};


export default FilesUpload;
