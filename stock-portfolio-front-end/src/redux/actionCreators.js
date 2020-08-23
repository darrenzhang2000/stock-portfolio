import Actions from './actions'

export function storePageName(pageName) {
    return {
        type: Actions.STORE_PAGE_NAME,
        payload: {
            pageName
        }
    }
}


export const setSnackbarState = (openSnackbar, message, variant) => {
    return {
        type: Actions.SET_SNACK_BAR_STATE,
        payload: {
            openSnackbar,
            message,
            variant
        }
    }
}

export const setCloseSnackbar = (() => {
    return {
        type: Actions.SET_CLOSE_SNACKBAR
    }
})