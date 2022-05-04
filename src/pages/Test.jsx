import React, { useEffect, useState, useContext, useReducer } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPrint } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select'
import axios from '../api/posts'
import { useSelector } from 'react-redux'
import AsyncSelect from 'react-select/async'
import { Link } from 'react-router-dom'
import DataContext from '../context/DataContext'
import ComboMWP from '../components/combos/ComboMWP'

const reducer = (state, action) => {
    switch (action.type) {
        case 'pais' :
            return { ...state, pais: action.payload }
        case 'bank' :
            return { ...state, bank: action.payload }
        case 'selectedBank' :
            return { ...state, selectedBank: action.payload}
        
        default:
            throw new Error();
    }
} 

const Test = () => {
    const [state, dispatch] = useReducer(reducer, 
        { pais:[], bank:[], selectedBank: {label: "Select...", value: 0} });

    const [catGpoFinanciero, setCatGpoFinanciero] = useState([]);
   /*  const [pais, setPais] = useState([]); */
   /*  const [bank, setBank] = useState([]); */
    const [catSecurity, setCatSecurity] = useState([]);
    const [searchBank, setSearchBank] = useState([]);
    const [bankSearch, setBankSearch] = useState([]);
    const [searchValue, setSearchValue] = useState('');
   /*  const [selectedBank, setSelectedBank] = useState( {label: "Select...", value: 0} ); */

    
    const token = useSelector(state => state.user.token);
    const {setTitle} = useContext(DataContext);

    useEffect(() => {
       setTitle('TEST')
    }, []);

    useEffect(() => {
        console.log(searchValue)
        if (searchValue.length >= 3 )
        {
           setBankSearch(state.bank.filter((i) =>
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
            /* setPais(response.data?.ResultSet); */
            dispatch({type:'pais', payload: response.data?.ResultSet})

            params = { 'catalogName': 'bank'}
            response  = await axios.post('catalog/getCatalogInfo', params, 
                            {
                                headers: {
                                    'Authorization' : `Bearer ${token}`,
                                    'Content-Type': 'application/json'
                                }
                            })

           /*  setBank(response.data?.ResultSet); */
           dispatch({type:'bank', payload: response.data?.ResultSet})

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
        return state.bank.filter((i) =>
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
            
            setSearchBank(state.bank.filter((i) =>
                    (i.ClaGpoFinanciero === selectedOption.value)));  
            
            /* setSelectedBank(null) */
            dispatch( { type: 'selectedBank', payload: null })
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

     const onChange = (selected, {action}) => {
         /* setSelectedBank(selected); */
         dispatch( { type: 'selectedBank', payload: selected } )
         if (action === 'clear') {
             /* setSelectedBank({label:'All', value:0}) */
             dispatch( { type: 'selectedBank', payload: {label:'All', value:0} } )
         }
     }

     const styles = {
        control: base => ({
          ...base,
          "&:hover": {
            borderColor: "rgb(220,220,220)",
            color: "rgb(220,220,220)"
          }
        })
      };

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
            options={state.pais}
            isClearable
            placeholder="Select a country"
            escapeClearsValue
        /> 

        <strong>Banks</strong>
        <Select 
            options={state.bank}
            value={state.selectedBank}
            defaultValue = { {label:'All', value:0} }
            onChange={onChange}
            isClearable
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
          
          <strong>Combo MWP</strong>
          <ComboMWP  
              className='react-select-container'
            classNamePrefix='react-select'
            catalogName='licenseType'  
            onChange={(e) => {console.log(e)}}
            
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
                value = {state.selectedBank}
               /*  onChange = {(e) => setSelectedBank({ label: e.label, value: e.value })} */
                onChange = { (e) => dispatch( {type: 'selectedBank', payload: { label: e.label, value: e.value  }} ) }
                options={searchBank}
            />
        </div>
        </div>
        <Link to="/settings">Settings</Link>
        <a href='http://localhost:2010/Pages/CST000401.aspx'>Redirect</a>
    </div>
  )
}

export default Test