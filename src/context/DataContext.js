import {createContext, useState} from 'react';

const DataContext = createContext({});

export const DataProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [title, setTitle] = useState('');

    return (
        <DataContext.Provider value={{
           user, setUser, title, setTitle
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;