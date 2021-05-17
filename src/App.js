import React from 'react'
import './App.css';


// direccion booststrap
import  'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap'

// componentes
import ListaVideos from './components/ListaVideos'

import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="container">
      <ListaVideos />
      < ToastContainer />
    </div>

    
  );
}

export default App;
