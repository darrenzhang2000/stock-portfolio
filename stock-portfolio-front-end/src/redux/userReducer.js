// action types
const ADD_USER = "ADD_USER"
const REMOVE_USER = "REMOVE_USER"


// action creators
export function addUser(user){
    return {
        type: ADD_USER,
        user
    }
}

export function removeUser() {
    return {
      type: REMOVE_USER
    }
  }

const initialState = {
    name: "",
    email: "",
    //balance: 5000,
    //transactions: [],
    //portfolio: []
}

// reducers
function userReducer(state = initialState, action) {
    switch (action.type) {
      case ADD_USER:
        return Object.assign({}, state, {
          name: action.user.name,
          email: action.user.email,
        })
  
      case REMOVE_USER:
        return Object.assign({}, state, {
          name: "",
          email: "",
        })
      // if the action is not recognized, don't do anything
      default:
        return state
    }
  }

export default userReducer
