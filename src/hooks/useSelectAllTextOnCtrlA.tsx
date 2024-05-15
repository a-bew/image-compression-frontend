import { useEffect, useRef } from 'react';

const useSelectAllTextOnCtrlA = (textareaRef: React.RefObject<HTMLTextAreaElement>) => {
  const handleSelectAllText = (event: KeyboardEvent) => {
    if (event.key === 'a' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault(); // Prevent the default behavior of Ctrl+A (select all)

      const textarea = textareaRef.current;
      if (textarea) {
        textarea.focus(); // Ensure the textarea is focused
        textarea.select(); // Select all text inside the textarea
      }
    }
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.addEventListener('keydown', handleSelectAllText);
    }

    return () => {
      if (textarea) {
        textarea.removeEventListener('keydown', handleSelectAllText);
      }
    };
  }, [textareaRef]); // Re-run effect when the textareaRef changes (e.g., component re-render)

  return textareaRef; // Return the textareaRef to allow external access if needed
};

export default useSelectAllTextOnCtrlA;
