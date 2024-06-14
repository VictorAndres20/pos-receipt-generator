import React from 'react';
import './App.css';
import { Splash } from './components/splash';
import { MainAlert } from './components/main-alert';
import { useProducts } from './hooks/use-products.hook';
import { Box, Button } from '@mui/material';
import { usePrint } from './hooks/use-print.hook';

function App() {
  
  const products = useProducts();
  const print = usePrint();

  return (
    <div className="App">
      <MainAlert />
      { 
      products.loading ?
        <Splash />
        :
        <Box sx={{ width: '100%' }}>
          <Button onClick={() => print.addData({name: 'hi'})}>
            Add
          </Button>
        </Box>
      }
    </div>
  );
}

export default App;
