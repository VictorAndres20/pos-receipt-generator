import React from 'react';
import './App.css';
import { Splash } from './components/splash';
import { MainAlert } from './components/main-alert';
import { useProducts } from './hooks/use-products.hook';
import AppContent from './AppContent';

function App() {
  
  const products = useProducts();

  return (
    <div className="App">
      <MainAlert />
      { 
      products.loading ?
        <Splash />
        :
        <AppContent products={products.data} />
      }
    </div>
  );
}

export default App;
