const STORE_PAGE_NAME = "STORE_PAGE_NAME"

const initalState = {
    pageName: ""
}

const storePageName = pageName => ({
    type: storePageName,
    pageName: pageName
})


export default function (state = initalState, action) {
    const { payload } = action
    switch (action.type) {
        case STORE_PAGE_NAME:
            return {
                ...state,
                pageName: payload.pageName
            }

        default:
            return state
    }

}