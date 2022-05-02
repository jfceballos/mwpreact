import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import DataContext from '../context/DataContext'


const Settings = () => {
    const {setTitle} = useContext(DataContext);

    useEffect(() => {
       setTitle('Settings')
    }, []);

  return (
    <div style={{marginTop:200}}>
         <Link to='/test'>Test</Link>
    </div>
  )
}

export default Settings
