import React, { useEffect, useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPrint } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select'
import axios from '../api/posts'
import { useSelector } from 'react-redux'
import AsyncSelect from 'react-select/async'
import { Link } from 'react-router-dom'
import DataContext from '../context/DataContext'

const Test = () => {
    const [catGpoFinanciero, setCatGpoFinanciero] = useState([]);
    const [pais, setPais] = useState([]);
    const [bank, setBank] = useState([]);
    const [catSecurity, setCatSecurity] = useState([]);
    const [searchBank, setSearchBank] = useState([]);
    const [bankSearch, setBankSearch] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [selectedBank, setSelectedBank] = useState( {label: "Select...", value: 0} );

    
    const token = useSelector(state => state.user.token);
    const {setTitle} = useContext(DataContext);

    useEffect(() => {
       setTitle('Test')
    }, []);

    useEffect(() => {
        console.log(searchValue)
        if (searchValue.length >= 3 )
        {
           setBankSearch(bank.filter((i) =>
                (i.label || '').toLowerCase().includes(searchValue.toLowerCase())
            ));
        }
        else {
            setBankSearch([]);
        }
    },[searchValue])
    

    useEffect(() => {
        const fetchCatalog = async () => {
            try {
            let params = { 'catalogName': 'country'}
            let response  = await axios.post('catalog/getCatalogInfo', params, 
                            {
                                headers: {
                                    'Authorization' : `Bearer ${token}`,
                                    'Content-Type': 'application/json'
                                }
                            })
            setPais(response.data?.ResultSet);

            params = { 'catalogName': 'bank'}
            response  = await axios.post('catalog/getCatalogInfo', params, 
                            {
                                headers: {
                                    'Authorization' : `Bearer ${token}`,
                                    'Content-Type': 'application/json'
                                }
                            })

            setBank(response.data?.ResultSet);

            params = { 'catalogName': 'gpoFinanciero'}
            response  = await axios.post('catalog/getCatalogInfo', params, 
                            {
                                headers: {
                                    'Authorization' : `Bearer ${token}`,
                                    'Content-Type': 'application/json'
                                }
                            })

            setCatGpoFinanciero(response.data?.ResultSet);

           /*  params = { 'catalogName': 'vSecurity'}
            response  = await axios.post('catalog/getCatalogInfo', params, 
                            {
                                headers: {
                                    'Authorization' : `Bearer ${token}`,
                                    'Content-Type': 'application/json'
                                }
                            })

            setCatSecurity(response.data?.ResultSet); */

        } catch (err){ 
            console.log(err)
        }
    } 
        fetchCatalog();
    },[token])

    
    
     const filterBanks = (inputValue) => { 
        return bank.filter((i) =>
          (i.label || '').toLowerCase().includes(inputValue.toLowerCase())
        );
      };  
       
      const promiseOptions = (inputValue) =>  
       {return  new Promise((resolve) => {       
        setTimeout(() => {
            resolve(filterBanks(inputValue));
          }, 1000);
      })} ;  

      
   
      const handleFilterBank = (selectedOption) => {
            
            setSearchBank(bank.filter((i) =>
                    (i.ClaGpoFinanciero === selectedOption.value)));  
            
            setSelectedBank(null)
      }

     const handleSearchSecurity = async (e) => {
         
         if (e.key === 'Enter') {
            
            const params = { 'catalogName': 'vSecurity', 'dependencyValue' : searchValue}
            const response  = await axios.post('catalog/getCatalogInfo', params, 
                            {
                                headers: {
                                    'Authorization' : `Bearer ${token}`,
                                    'Content-Type': 'application/json'
                                }
                            })

            setCatSecurity(response.data?.ResultSet);
         }
     }

     

  return (
    <div className='test'> 
        <div  className='HeaderbarBtn'>
            <FontAwesomeIcon className='iconBtn' icon={faPrint} />  
        </div>
        <div className='row justify-content-around'>
            <div className='col-md-2'>
            <strong>Bank (type at least three chars)</strong>
        <Select 
            className='react-select-container'
            classNamePrefix='react-select'
            onInputChange={(newValue) => setSearchValue(newValue)}
           /*  onKeyDown={(e) => handleSetType(e)} */
            options={bankSearch}  
           
            /> 
        
        <strong>Country</strong>
        <Select 
            options={pais}
            isClearable
            placeholder="Select a country"
            escapeClearsValue
           
            /> 

        <strong>Banks</strong>
        <Select 
            options={bank}
        />
        <strong>Banks (async)</strong>
        <AsyncSelect 
            cacheOptions 
            defaultOptions 
            loadOptions={promiseOptions} 
            
        />
        </div>
        <div className='col-md-2'>
            <strong>Security (Press Enter to search)</strong>
            <Select 
                options={catSecurity} 
                onInputChange={(newValue) => setSearchValue(newValue)}
                onKeyDown={(e) => handleSearchSecurity(e)}
               
            />
          
            
            
         
        </div>
        <div className='col-md-2'>
            <strong>Grupo Financiero</strong>
            <Select 
                options={catGpoFinanciero}
                onChange={handleFilterBank}
            />
            <strong>Banco (dependiente del grupo financiero)</strong>
            <Select 
                value = {selectedBank}
                onChange = {(e) => setSelectedBank({ label: e.label, value: e.value })}
                options={searchBank}
            />
        </div>
        </div>
        <Link to="/settings">Settings</Link>
    </div>
  )
}

export default Test