import {useEffect, useState} from 'react'
import Select from 'react-select';
import axios from '../../api/posts';
import { useSelector } from 'react-redux'; 
import '../../App.scss'

const LicenseType = ({initialValue, onChange}) => {
    const [catalog, setCatalog] = useState([]);

    const token = useSelector(state => state.user);
  
    useEffect(() => {
        getCatalogInfo();
    },[])

    const getCatalogInfo = async () => {
        try {
            const params = {'catalogName': "licenseType", 'dependencyValue' : ''} ;
            const response  = await axios.post('catalog/getCatalogInfo', params, 
                            {
                                headers: {
                                    'Authorization' : `Bearer ${token}`,
                                    'Content-Type': 'application/json'
                                }
                            })

            setCatalog(response.data?.ResultSet);

        } catch (err){ 
            console.log(err)
        }
    }

  return (
    <div>
        <Select 
         value={catalog.filter( opt => opt.value === initialValue)}         
         onChange = {onChange}
         options={catalog}
        />
    </div>
  )
}

export default LicenseType