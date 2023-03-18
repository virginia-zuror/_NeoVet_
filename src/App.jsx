import { Outlet } from 'react-router-dom';
import './App.css';
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"

const App = () => {
  return <div className="App">
    <Header/>
    <Outlet/>
    <Footer/>
  </div>;
};

export default App;
