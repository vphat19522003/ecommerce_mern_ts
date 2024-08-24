import { Button, Slider } from '@mui/material';

import './App.css';

function App() {
  return (
    <>
      <Button className='text-red-600'>Tailwind Button</Button>
      <div>
        <Slider defaultValue={30} />
        <Slider defaultValue={30} className='text-teal-600' />
      </div>
    </>
  );
}

export default App;
