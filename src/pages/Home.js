import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';

const Home = () => {
  return (
     <nav className="navbar navbar-expand-lg gap-lg-5">
    <a className="navbar-brand" href="#">Navbar</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
   
    <div className="collapse navbar-collapse gap-lg-5 " id="navbarSupportedContent">
      <ul className="nav navbar-nav gap-lg-5  w-100">
        <li className="nav-item active">
            <Link to="/home" className="nav-link" >Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/clientes" className="nav-link">Customers</Link>
        </li>
        <li className="nav-item">
          <Link to="/portfolio" className="nav-link">Portfolio Analysis</Link>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
           Administrator 
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <a className="dropdown-item" href="#">Users</a>
            <a className="dropdown-item" href="#">Clients</a>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" href="#">Settings</a>
          </div>
        </li>
       {/*  <li className="nav-item">
          <a className="nav-link disabled" href="#">Disabled</a>
        </li> */}
      </ul>
      

    {/*   <form className="form-inline my-2 my-lg-0 d-flex">
        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/ >
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form> */}

    </div>
    <ul className='navbar-nav collapse navbar-collapse justify-content-end mx-md-5 '>
        <li><Link to="/login" className='nav-link'><LoginOutlinedIcon/>Sign In</Link></li>
      </ul>
    
  </nav>
 
  )
}

export default Home