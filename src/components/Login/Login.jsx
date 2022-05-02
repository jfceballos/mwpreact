import {useRef, useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth'  
import axios from '../../api/posts';
import './login.scss'
import { useDispatch } from 'react-redux';
import { login } from '../../actions';

const LOGIN_URL = 'auth/login';

const Login = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    
    const dispatch = useDispatch(); 

    const errRef = useRef();
    const userRef = useRef();

    useEffect(() => {
      userRef.current.focus();
    },[])

    useEffect(() => {
      setErrMsg('')
  }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
          try{
          const response = await axios.post(LOGIN_URL, 
            JSON.stringify({Username: user, Password: pwd}),
            {
              headers: {'Content-Type': 'application/json'},
              withCredentials: false             
            }
          );
          const accessToken = response?.data;
         
          dispatch(login(accessToken));
         /*  dispatch(login({
            name: user,
            token: accessToken
          })); */
          
          /* window.localStorage.setItem("token", accessToken); */

          setAuth({user, pwd, accessToken});
          setUser('');
          setPwd('');
          navigate('/clientes');

        } catch (err) {
            console.log(err);
            setErrMsg('Login failed.');
            userRef.current.focus();
        }  
    }

  return (
    <div className='container'> 
    
      <div className='screen'>   
        <div className="screen__content">
            
            <form className='login'  onSubmit={handleSubmit}>
              <div className="login__field">

              <label htmlFor='username'>UserName:</label>
              <input 
                className="login__input"
                type="text"
                placeholder='User name'
                id="username"    
                ref={userRef}           
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                required
              />
            </div>

            <label htmlFor='password'>Password:</label>
            <input 
                 className="login__input"
                type="password"
                placeholder='Password'
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                required
              />
               <button className="button login__submit">
                 <span className='button__text'>Sign In</span> 
                </button>
        </form>
        </div>
        <div className="screen__background">
			      <span className="screen__background__shape screen__background__shape4"></span>
			      <span className="screen__background__shape screen__background__shape3"></span>		
			      <span className="screen__background__shape screen__background__shape2"></span>
			      <span className="screen__background__shape screen__background__shape1"></span>
		      </div>		
      </div>
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p> 
    </div>
  )
}

export default Login