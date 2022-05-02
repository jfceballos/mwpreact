import { createStore } from "redux"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import userReducer from './user'

const configureStore = () => {

    const persistConfig = {
        key: "root",
        storage
      }
    const pReducer = persistReducer(persistConfig, userReducer)
    const store = createStore(pReducer)
    const persistor = persistStore(store);

    return {store, persistor}
}

export default configureStore;