import Select from 'react-select'
import { useSelector } from 'react-redux'
import axios from '../../api/posts'
import { forwardRef, useState, useEffect  } from 'react'


const ComboMWP = forwardRef ( (props, ref) => {
    const [catalog, setCatalog] = useState([]);
   
    const token = useSelector(state => state.user.token);
    
  
    useEffect(() => {  
        /* console.log(`ComboMWP rendered: ${props.catalogName} ${props.dependencyValue}`);   */         
        getCatalogInfo();
    },[props.dependencyValue])

    
    const getCatalogInfo = async () => {
        try {
            console.log(props.catalogName);
            const params = { 'catalogName': props.catalogName, 'dependencyValue': props.dependencyValue}

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
         <Select {...props} options={catalog} onChange = {props.onChange}
       /*   value={catalog.filter( opt => opt.value === initialValue)}   */
        /*     className={className}
            classNamePrefix={classNamePrefix}
            onChange = {onChange}
            options={catalog} */
         />
    </div>
  ) 
}
)

export default ComboMWP