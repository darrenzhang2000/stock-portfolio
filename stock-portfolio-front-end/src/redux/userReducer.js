// import store from "./reduxStore"

// action types
const ADD_USER = "ADD_USER"
const REMOVE_USER = "REMOVE_USER"

// action creators
export function addUser(user) {
    console.log('action user', user)
  return {
    type: ADD_USER,
    user,
  }
}

export function removeUser() {
  console.log('rm user')
  return {
    type: REMOVE_USER,
  }
}

const initialState = {
  name: "",
  email: "",
  balance: 0,
  //transactions: [],
  //portfolio: []
}

// reducers
function userReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_USER:
      return Object.assign({}, state, {
        // name: action.user.name,
        email: action.user.email,
        balance: action.user.balance
      })

    case REMOVE_USER:
      return Object.assign({}, state, {
        // name: "",
        email: "",
        balance: 0
      })
    // if the action is not recognized, don't do anything
    default:
      return state
  }
}

export default userReducer