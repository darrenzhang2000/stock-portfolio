import { createStore } from "redux"
import userReducer from "./userReducer"
import { addUser, removeUser } from "./userReducer"

export function addUserDispatch(user){
    return store.dispatch(addUser(user))
}

export function removeUserDispatch(){
    return store.dispatch(removeUser())
}

const store = createStore(
  userReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store
