function useLocalStorage () {
  if (typeof window !== "undefined") {
  const getValue = (key) => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue;
    } catch (error) {
      console.error(`Ошибка при получении localStorage: ${error}`);
      return null;
    }
    };


  const setValue = (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error(`Ошибка при настройке localStorage: ${error}`);
    }
  };

  const removeValue = (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Ошибка при удалении localStorage: ${error}`);
    }
  };

  return { getValue, setValue, removeValue };
  }
}

export { useLocalStorage };