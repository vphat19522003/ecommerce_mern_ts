import { ArrowUpward } from '@mui/icons-material';
import { IconButton } from '@mui/material';

const ScrollToTopButton = (): JSX.Element => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <IconButton className='fixed bottom-14 right-6 bg-white shadow-md text-blue-700' onClick={handleScrollToTop}>
      <ArrowUpward />
    </IconButton>
  );
};

export default ScrollToTopButton;
