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
import ReactHookForm from './pages/ReactHookForm';
import Redirect from './pages/Redirect';
import AssetTable from './components/CST/AssetTable';
 

function App() {
  console.log('App')

  return (
    <DataProvider>
      
          <Header />  
         {/*  <ReactHookForm /> */}
           <Routes>      
              <Route path='/' element={<Settings />}>
                  <Route index path='/asset' element = {<AssetTable/>} />
                  <Route path='/test2' element ={<ReactHookForm />} />
              </Route>
            <Route path="/test" element = { <Test/>} />
            <Route path="/login" element = {<Login/>} />
            <Route path="/clientes" element = {<CST000401/>} />
            <Route path="/createuser" element = {<CreateUser/>} />
            <Route path="/portfolio" element = {<CPA001001/>} />
            <Route path="/settings" element = {<Settings/>} />
            <Route path="/url" element = { <Redirect url='http://localhost:2010/Pages/GEN000101.aspx?main=1'/> } />
         </Routes>
         
    </DataProvider>
         
  );
}

export default  App ;
