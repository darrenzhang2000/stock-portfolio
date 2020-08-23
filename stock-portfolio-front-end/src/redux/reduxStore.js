import { createStore, combineReducers } from "redux"
import userReducer from "./userReducer"
import { addUser, removeUser } from "./userReducer"
import layoutReducer from "./layoutReducer"

export function addUserDispatch(user){
    return store.dispatch(addUser(user))
}

export function removeUserDispatch(){
    return store.dispatch(removeUser())
}

const reducers = combineReducers({userReducer, layoutReducer})

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store
