import React, {useState, useEffect, useContext} from 'react';
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory  from 'react-bootstrap-table2-paginator'
import Modal from 'react-modal';
import './cst.scss'
import { useNavigate } from 'react-router-dom';
import DataContext from '../../context/DataContext';



const BSTable = ({customers, func, actual}) => {
  const { setUser } = useContext(DataContext);
  const[search, setSearch] = useState('');
   const[searchResults, setSearchResults] = useState([]);
   const[hide, setHide] = useState(true);
 
   const navigate = useNavigate();
   
   useEffect(() => {
    func("");
  }, [hide]);
   

   useEffect(() => {
      setSearchResults(customers);
   },[customers])

   useEffect(() => {
     const filterResults = customers.filter(c => ((c.NomTipoLicencia).toLowerCase()).includes(search.toLowerCase())
    || ((c.NomTipoPersonaCliente || '').toLowerCase()).includes(search.toLowerCase())
    || ((c.NomPais || '').toLowerCase()).includes(search.toLowerCase()));

    setSearchResults(filterResults);

   },[search, customers])

   const headerSortingStyle = { backgroundColor: '#c8e6c9' };

    const columns =[{
        dataField: 'IdCliente',
        text: 'Customer ID',
        sort: true,
        headerSortingStyle,
    },{
        dataField: 'NomTipoPersonaCliente',
        text: 'Customer Type',
        sort: true,
        headerSortingStyle
    },{
        dataField: 'NomTipoLicencia',
        text: 'License Type'
    },{
        dataField: 'NomPais',
        text: 'Country'
    }]



  const options = {
        sizePerPage: 10,
        hideSizePerPage: true,
        hidePageListOnlyOnePage: true,
        firstPageText: 'First',
        prePageText: '<'
      };  

     const selectRow = {
        mode: 'checkbox',
        clickToSelect: true,
        hideSelectColumn: true,
        onSelect: (row, isSelect) => {
             setUser(row);
             setHide(!hide);
           /*   navigate('/createuser/'); */
        }
       };  

  return (
    <div className='cst'>
    
        <input 
            id='search'
            type="text"
            placeholder='Type to search...'
            onChange={(e) => setSearch(e.target.value)}   

        />
             
        <button type="button" 
                  className="btn btn-primary btn-sm" 
                  onClick={() => navigate('/createuser')}>New User</button>
        
        <BootstrapTable              
            keyField='IdCliente' 
            data={searchResults} 
            columns={columns} 
            pagination = {paginationFactory(options)}  
            selectRow = {selectRow}
            striped
            hover
            condensed
            bordered={ false }
            responsive="sm"
        />
        
       {/*  <Modal 
            style={customStyles} 
            isOpen={modalOpen}
            onRequestClose={()=>setModalOpen(false)}  
         >
           <CSTCustDetail/>
        </Modal> */}
    </div>
  )
}

export default BSTable