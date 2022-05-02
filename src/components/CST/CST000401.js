import axios from '../../api/posts';
import React from 'react'
import { useState, useEffect, useContext } from 'react';
import BSTable from './BSTable';
/* import useAuth from '../../hooks/useAuth'   */
import { useSelector } from 'react-redux'; 
import {  Link,useNavigate } from 'react-router-dom';
import DataContext from '../../context/DataContext';
import './cst.scss'
import { PersonAddAltOutlined } from '@mui/icons-material';
import CreateUser from './CreateUser';
import UserInfo from './UserInfo';
 
 
 

const CST000401 = () => {
    const[customers, setCustomers] = useState([]);
    const {setUser} = useContext(DataContext);
    const [display, setDisplay] = useState("");
    const [editMode, setEditMode] = useState(false);
    
    const hideComponent = (data) => {
      setEditMode(false);
      setDisplay(data);
      console.log(data);
    }
    
    /* const {auth} = useAuth();   */
    const navigate = useNavigate();

    /* const token = localStorage.getItem('token'); */
    const token = useSelector(state => state.user.token);
    
    useEffect(() => {
        handleSubmit();
        setUser(null);
    },[])

    const handleSubmit = async () => {
        console.log('handleSubmit');
        const params = {ClaFamiliaCliente: 1, ClaUsuarioMod: 2};
        try {
            
            const response = await axios.post('legacy/getCustomers', 
                                   params,
                                   {
                                     headers: {
                                                'Authorization' : `Bearer ${token}`,
                                                'Content-Type': 'application/json'
                                              },
                                     withCredentials: false
                                   })
         
            setCustomers(response.data?.ResultSet); 
        } catch (err) {
            console.log(`Error: ${err.message}`);
            navigate('/login');
        }
    }

    const handleShowData = (e) => {
        e.preventDefault();
        console.log(token);  
    }

   
  

  return (
    <div className='cst'> 
       <div className='row col-12 '>
            <div className='col-md'> 
                <BSTable 
                  customers={customers} 
                  func={hideComponent}
                  actual={display}
                />  
            </div>
            <div className={`col-md ${display}`}>
                 <CreateUser
                  func={hideComponent}
                  editMode = {editMode}
                  setEditMode = {setEditMode}
                 />               
            </div>
       </div>
       
    </div>
  )
}

export default CST000401