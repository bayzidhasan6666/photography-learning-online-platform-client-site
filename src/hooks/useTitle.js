import { useEffect } from 'react';

const useTitle = (title) => {
  useEffect(() => {
    document.title = `${title} | Visual Learning`;
  }, [title]);
};

export default useTitle;
