/**
 * Форматирует дату в строку
 */
export const formatDate = (date: Date): string => {
    return date.toLocaleDateString('ru-RU');
  };
  
  /**
   * Форматирует размер файла в читаемый вид
   */
  export const formatFileSize = (bytes: number): string => {
    const units = ['Б', 'КБ', 'МБ', 'ГБ'];
    let size = bytes;
    let unitIndex = 0;
  
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
  
    return `${Math.round(size)} ${units[unitIndex]}`;
  };
  
  /**
   * Генерирует уникальный ID
   */
  export const generateId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  };