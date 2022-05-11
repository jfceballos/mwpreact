import React, { useContext, useEffect } from 'react'
import DataContext from '../context/DataContext'
import '../App.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import Test from './Test';
import Login from '../components/Login/Login';


const Settings = () => {
    const {setTitle} = useContext(DataContext);

    useEffect(() => {
       setTitle('SETTINGS')
    }, []);

  return (
    <div style={{marginTop:55}} id='#topheader'>
         <nav className='navbar navbar-expand-md'>
             <button 
                className='navbar-toggler' 
                type='button' 
                data-toggle='collapse' 
                data-target="#navbarSupportedContent" 
                aria-controls='navbarSupportedContent'
                aria-expanded='false'
                aria-label='Toogle navigation'>
                    
                    <span className="navbar-toggler-icon"></span>
            </button> 
            <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                <ul className='nav navbar-nav'>
                    <li className='nav-item dropdown'>
                        <a className='nav-link dropdown' href='#' id='navbarDropdown' role='button'
                           data-toggle="dropdown"  aria-haspopup='false' aria-expanded='false'>
                                <a href='#' className='nav-link'>Report Settings</a>
                        </a>
                        
                        <div className='dropdown-menu' aria-labelledby='navbarDropdown'>
                            <a className='dropdown-item' href='#'>Report Settings</a>
                            <a className='dropdown-item' href='#'>Client Portal</a>
                            <a className='dropdown-item' href='#'>Local CCY</a>
                            <a className='dropdown-item' href="#">General Ledger</a>

                        </div>
                    </li>
                    <li className='active nav-item'>
                        {/* <a href='#'>Colors & Themes</a> */}
                        <Link to='/asset'  className='nav-link'>Colors & Themes</Link>
                    </li>
                    <li className='nav-item'>
                        {/* <a href='#' className='nav-link'>Portfolio Management</a> */}
                        <Link to='/test2'  className='nav-link'>Portfolio Management</Link>
                    </li>
                    <li className='nav-item'>
                        <a href='#' className='nav-link'>Catalogs</a>
                    </li>
                   
                    <li className='nav-item'>
                        <a href='#' className='nav-link'>Security Master</a>
                    </li>
                </ul>
            </div>
         </nav>
         <Outlet/>
         <div>
         
         {/* <Routes>      
            <Route index element = {<Test/>} />
           
        </Routes> */}
         </div>

    </div>
  )
}

export default Settings
