
export function copyArrayOfObjects<T>(original: T[]): T[] {
    // Create a new array to hold the copies
    const copy: T[] = [];
  
    // Use the spread operator to clone each object in the original array
    for (const obj of original) {
      copy.push({...obj});
    }
  
    return copy;
}
  
export const getFileNameFromUrl = (url: string) => {
  const lastSlashIndex = url?.lastIndexOf('/');
  return url.substring(lastSlashIndex + 1);
}
