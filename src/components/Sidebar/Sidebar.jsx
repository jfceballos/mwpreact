import { Link } from 'react-router-dom'
import './sidebar.scss'

const Sidebar = () => {
   
  return (
    <div className="sidebar">
           <ul>
             <li>
               <Link to="/">Home</Link>
             </li>
             <li>
               <Link to="/clientes">Customers</Link>
             </li>
             </ul>  
    </div>
  )
}

export default Sidebar