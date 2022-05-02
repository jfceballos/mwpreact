import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom'
import {AuthProvider} from './context/AuthProvider'
import { Provider } from 'react-redux';
 import { PersistGate } from 'redux-persist/integration/react';
import { createStore } from 'redux';
import userReducer from './reducers/user';
import allReducers from './reducers';

import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"


  const persistConfig = {
    key: "root",
    storage
  }
const pReducer = persistReducer(persistConfig, allReducers)

const store = createStore(pReducer, window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__());

const persistor = persistStore(store);
 
ReactDOM.render(
  <AuthProvider>
    <Router> 
       <Provider store={store}>  
         <PersistGate persistor={persistor}> 
        <App/> 
         </PersistGate> 
        
       </Provider>        
    </Router>
    </AuthProvider>,
  document.getElementById('root')
);