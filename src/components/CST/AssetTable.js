import { Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FaSearch } from 'react-icons/fa'
import { BsPlus } from 'react-icons/bs'
import { FcExpand } from 'react-icons/fc'
/* import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons' */
import './cst.scss'
import { getSecurityMaster, getAssetStatus, getAssetError } from '../../features/asset';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import HoldingsTable from './HoldingsTable' 
import ComboMWP from '../combos/ComboMWP'


const AssetTable = () => {
    const dispatch = useDispatch()
  /*   const [assets, setAssets] = useState([]);   */
    const assetStatus = useSelector(getAssetStatus);
    const assetError = useSelector(getAssetError);
    const [secMaster, setSecMaster] = useState({});

    useEffect(() => {
          dispatch(getSecurityMaster(secMaster))  
        /*     .unwrap()
            .then((result) => {
                setAssets(result)
            })   */
            console.log(assetStatus);
    },[secMaster]) 
   
    const assets = useSelector( state => state.asset.assets)  

  /*    const getSecurityMaster = async() =>{
    try {
        const params = {ClaFamiliaCliente: 1, ClaSecurityMaster: 1};
        const response = await axios.post('legacy/getSecurityMaster',
        params,
        {
          headers: {
                     'Authorization' : 'Bearar token', 
                     'Content-Type': 'application/json'
                   },
          withCredentials: false
        })
        
        setAssets(response.data)
        } catch (err) {
            console.log('Error')

        }
   }   */
       
   const assetclass = [ 
       { id: 'k', name: 'Agreements', checked: false }, 
       { id: 'w', name: 'Alternative Investments', checked: false }, 
       { id: 'd', name: 'Cash and Equivalents', checked: false }, 
       { id: 'a', name: 'Collections', checked: true }, 
       { id: 'q', name: 'Commodities', checked: false },
       { id: 't', name: 'Cryptocurrencies', checked: false },
       { id: 'c', name: 'Equity', checked: false },
    ]

  return (
    <div className='row cst'>
        <h3>SECURITY MASTER</h3> 
        <div className='col-lg-4 d-flex flex-column px-5 mt-5'>
            <ComboMWP  
                catalogName='securityMaster'  
                onChange={(e) => {setSecMaster(e)}}
                 />
            <article>
            {secMaster.description}
            </article>
        </div>
        <div className='col-lg-4 px-5'>
            <h5>Security Master Structure</h5>
            {/* <FontAwesomeIcon icon="faCoffee" /> */}
            <div className='btnsection'>
                <button className='asset'><BsPlus/> New Asset Class</button>
                <button className='asset' data-toggle="modal" data-target="#exampleModalCenter"><BsPlus/> New Security Type</button>
            </div>
            <div className='sectionAsset'>
          {  assets  ?   
            <Table striped hover>
                <tbody>
                    { assets.map( asset => (  
                        <>
                        <tr> 
                            <td
                                data-toggle='collapse'
                                data-target= {`.${asset.code}`}
                                aria-controls = {`mc-${asset.code}`}
                                style={{textAlign:'center'}}
                            >
                                  {asset.sectype.length ? <span><FcExpand /></span>  : ''}  
                            </td>
                            <td>
                                {asset.name}
                            </td>
                            <td> {asset.search ? <FaSearch /> : '' } </td>
                        </tr>
                        {asset.sectype.map( st => (
                            <tr className={`collapse ${asset.code}`} id={`mc-${asset.code}`}>
                                <td></td>
                                <td>
                                    {st.name}
                                </td>
                            </tr>   
                        ) )}  
                        </>                                      
                    ))} 
                   
                </tbody>
            </Table> 
              : <p>{assetStatus}...</p> }   
            </div>
        </div>
        <div className='col-lg-4'>
            <h3>Actual Holdings Preview</h3>
            <HoldingsTable key='ht'/>
        </div>

         
        <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">New Security Type</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body d-flex">
                 <div className='me-5'>
                     <p>Asset class name</p>
                 </div>
                 <div>
                    <table>
                        <tbody>
                            {assetclass.map( item => (
                                <tr key={item.id}>
                                    
                                    <td>
                                    <div className='squaredOne'>
                                        <input id={item.name} value={item.name} type="checkbox" /> 
                                        <label htmlFor={item.name}></label>   
                                        </div>                            
                                    </td>
                                    
                                    <td> <label htmlFor={item.name}> {item.name}</label></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
            </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default AssetTable