import { Routes, Route} from 'react-router-dom'
import CreateUser from './components/CST/CreateUser';
import CST000401 from './components/CST/CST000401'
import Login from './components/Login/Login';  
import { DataProvider } from './context/DataContext';
import Sidebar from './components/Sidebar/Sidebar';
import './App.scss' 
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Header from './pages/Header';
import CPA001001 from './components/CPA/CPA001001';
import Test from './pages/Test';
import Settings from './pages/Settings';
 

function App() {

  return (
    <DataProvider>
      
          <Header />
           <Routes>      
            <Route path='/test' element = {<Test/>} />
            <Route path="/login" element = {<Login/>} />
            <Route path="/clientes" element = {<CST000401/>} />
            <Route path="/createuser" element = {<CreateUser/>} />
            <Route path="/portfolio" element = {<CPA001001/>} />
            <Route path="/settings" element = {<Settings/>} />
         </Routes>
         
    </DataProvider>
         
  );
}

export default  App ;
