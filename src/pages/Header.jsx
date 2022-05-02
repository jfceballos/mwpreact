import logo from './../assets/logonew.png'
import './../App.scss'
import { useContext } from 'react'
import DataContext from '../context/DataContext'

const Header = () => {
  const {title} = useContext(DataContext);

  return (
    <div className='BarraLogo'>
        <div className='BarraLogoIzq'>
            <img src={logo} alt="Logo" className='logo' />
            <span className='pageTitle'>{title}</span>
        </div>
    </div>
  )
}

export default Header