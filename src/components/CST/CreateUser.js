import axios from '../../api/posts'
import React, { createRef } from 'react'
import { useSelector } from 'react-redux';
import { useState, useContext, useEffect, useRef } from 'react';
import Select from 'react-select';
/* import './cst.scss' */
import LicenseType from '../combos/LicenseType';
import {Link, useNavigate} from 'react-router-dom';
import DataContext from '../../context/DataContext';
import ComboMWP from '../combos/ComboMWP';


const CREATE_USER = 'legacy/createUser';

const CreateUser = ({func, editMode, setEditMode}) => {
    const {user} = useContext(DataContext);    
    const comboLicenseRef = createRef();
         
    const typeReference = useRef();
    const navigate = useNavigate();
    
    const token = useSelector(state => state.user.token);

    const [infoCatalog, setInfoCatalog] = useState({ licenseType:0}) 

    const[newUser, setNewUser] = useState({ 
            clienteId: user ? user.ClaveCliente : "", 
            firstname: user ? user.NomCliente : "", 
            middlename:"",
            lastname:"", 
            shortname:"",
            nomTipoLicencia : user ? user.NomTipoLicencia : "",
            licenseType:null })

    const handleChange = (e) => {
        console.log('try to edit...')
        setEditMode(true);
        const { name, value } = e.target;         
        setNewUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
     
    useEffect(() => { 
        console.log(user);
    }, [infoCatalog, user]);

    const comboMWPOnChange = ({name, value}) => {
        setInfoCatalog(prevState => ({
            ...prevState,
            [name]: value
        }))
       
    }

    const comboOnChange = ({name, value}) => {
        setNewUser(prevState => ({
            ...prevState,
            [name]: value
        }));
        
      }

    const Type = [
        { label: "Personal Owen", value: 1 },
        { label: "Business", value: 2 },
        { label: "Trust", value: 3 }
      ];

    const handleCreateUser = async (e) => {
        e.preventDefault();
       try {
            console.log(newUser);

            if (newUser.licenseType === null)
            throw Error('invalid license type') 

            const response = await axios.post(CREATE_USER,
                {
                     ClaFamiliaCliente : 1,
                     NumCliente  : newUser.clienteId,
                      NomCliente : newUser.firstname,
                      NomCliente2: "PT",
                      ApellidoCliente : newUser.lastname,
                      AliasCliente : newUser.shortname ,
                      ClaPaisCliente:  3 , 
                      IdOficina: 1 ,
                      IdUsuarioPromotor: 22100043,
                      ClaTipoLicencia: newUser.licenseType,
                      ClaveRepExterno: null,
                      NombrePcMod:"::1" ,
                      ClaUsuarioMod: 2 ,
                      ClaCliente: 15 ,
                      EsClienteEmpresa:0 ,
                      ClaTipoCliente: 293 
                },
                {
                    headers: {  'Authorization' : `Bearer ${token}`,
                                'Content-Type': 'application/json'
                            }         
                });
            
            console.log(response);
        } catch (err) {
               console.log('axios error')
              
        }
    } 

  return (
      <div>
  
    <form onSubmit={handleCreateUser} >
    
    
    <div className='row col-12 createuser'>   
    <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Information saved!</strong> You should check in on some of those fields below.
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>      
        <div className='col-md leftside'>
        <label htmlFor='clientId'>Client ID</label>
        <input
            id="clientId"
            name="clienteId"
            type='text'
            placeholder='Client ID'
            value={user && !editMode  ? user.ClaveCliente || '' : newUser.clienteId } 
            onChange={ handleChange }
            required
        />
        <label htmlFor='Type'>Type</label>
        <Select
            className='react-select-container'
            classNamePrefix='react-select'
            value={ { label: "Personal Owen", value: 1 }}
            options={Type}
            ref = {typeReference}
            onChange={(e) => {
                setNewUser(prevState => ({
                    ...prevState,
                        Type: e.value
                    }))
                }}   
               
        />  
        
        <label htmlFor='firstname'>First name</label>
        <input 
            id='firstname'
            name='firstname'
            type='text'
            placeholder='First name'
            value={user && !editMode  ? user.NomCliente || '' : newUser.firstname } 
            onChange={ handleChange }
            required
        />
         <label htmlFor='middlename'>Middle name</label>
        <input 
            id='middlename'
            name='middlename'
            type='text'
            placeholder='Middle name'
            value={newUser.middlename}
            onChange={ handleChange }
            required
        />
        <label htmlFor='lastname'>Last name</label>
        <input 
            id='lastname'
            name='lastname'
            type='text'
            placeholder='Last name'
            value={newUser.lastname}
            onChange={ handleChange }
            required
        />
        <label htmlFor='shortname'>Alias / Short name</label>
        <input 
            id='shortname'
            name='shortname'
            type='text'
            placeholder='Short name'
            value={newUser.shortname}
            onChange={ handleChange }
            required
        />
        </div>
        <div className='col-md rightside'>        
            <label htmlFor='licensetype'>License Type</label>
            <LicenseType 
                id='licenseType' 
                initialValue = { newUser.licensetype }
                onChange={(e) => comboOnChange({name:'licenseType',value:e.value})}/>
            <label htmlFor='relmanager'>Rel. Manager</label>
            <Select 
            className='react-select-container'
            classNamePrefix='react-select'
            options={Type}
            onChange={(e) => {
                setNewUser(prevState => ({
                    ...prevState,
                        Type: e.value
                    }))
                }}           
            /> 
             <ComboMWP 
                key = 'licenseType'
                comboref = {comboLicenseRef}
                catalogName='licenseType'
                onChange={(e) => {
                    comboMWPOnChange({name:'licenseType',value:e.value})}
                }

            />
        </div>
        <div className='row col-10 justify-content-end'>  
        <div className='col-2 offset-md-2 header'>
            <button className='btn btn-primary'  type='submit'>  
            Save</button>
            <button type="button" className="btn btn-secondary" 
                onClick={() => 
                    {   func("d-none");
                       /*  navigate(-1); */
                }}>
                Back
            </button>
           
            
        </div>
    </div>
    </div>
   
    </form> 
   
    </div>
  )
}

export default CreateUser