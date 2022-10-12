import React from "react";
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <ToastContainer pauseOnFocusLoss={false} />
      <Header/>
      <Home/>
      <Footer/>
    </div>
  );
}

export default App;
