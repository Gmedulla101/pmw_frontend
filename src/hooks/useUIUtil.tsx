const useUIUtil = () => {
  const isDarkMode =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;

  return {
    isDarkMode,
  };
};

export default useUIUtil;
