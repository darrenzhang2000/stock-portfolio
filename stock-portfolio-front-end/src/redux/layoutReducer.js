import Actions from './actions'

const initalState = {
    pageName: "",
    openSnackbar: false,
    snackbarMessage: "",
    snackbarVariant: ""
}

export default function (state = initalState, action) {
    const { payload } = action
    
    switch (action.type) {
        case Actions.STORE_PAGE_NAME:
            return {
                ...state,
                pageName: payload.pageName
            }

        case Actions.SET_SNACK_BAR_STATE:
            return {
                ...state,
                openSnackbar: payload.openSnackbar,
                snackbarMessage: payload.message,
                snackbarVariant: payload.variant
            }

        case Actions.SET_CLOSE_SNACKBAR:
            return {
                ...state,
                openSnackbar: false
            }

        default:
            return state
    }

}