import { useState, useEffect } from 'react';

const useUIUtil = () => {
  const darkModeState =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;

  const [isDarkMode, setIsDarkMode] = useState<boolean>(darkModeState);

  useEffect(() => {
    setIsDarkMode(darkModeState);
  }, [darkModeState]);

  console.log(darkModeState, isDarkMode);

 
  https: return {
    isDarkMode,
  };
};

export default useUIUtil;
