import Select from 'react-select'
import { useSelector } from 'react-redux'
import axios from '../../api/posts'
import { useState, useEffect  } from 'react'


const ComboMWP = ({catalogName, dependencyValue, onChange, comboref}) => {
    const [catalog, setCatalog] = useState([]);
   
    const token = useSelector(state => state.user.token);
    
  
    useEffect(() => {  
        console.log(`ComboMWP rendered: ${catalogName} ${dependencyValue}`);           
        getCatalogInfo();
    },[dependencyValue])

    
    const getCatalogInfo = async () => {
        try {
            
            const params = { 'catalogName': catalogName, 'dependencyValue': dependencyValue}

            const response = await axios.post('catalog/getCatalogInfo', params,
                            {
                                headers: {
                                    'Authorization': `Bearer ${token}`,
                                    'Content-Type': 'application/json'
                                }
                            })

            setCatalog(response.data?.ResultSet);


        } catch (err) {
            console.log(err)
        }
    }

  return (
    <div>
         <Select 
       /*   value={catalog.filter( opt => opt.value === initialValue)}   */
            onChange = {onChange}
            options={catalog}
            ref =  {comboref}
           
            /* value= {{ label: defaultLabel, value: defaultValue}}   */
         />
    </div>
  )
}

export default ComboMWP