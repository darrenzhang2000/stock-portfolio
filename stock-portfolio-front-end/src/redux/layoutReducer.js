import Actions from './actions'

const initalState = {
    pageName: ""
}

export default function (state = initalState, action) {
    const { payload } = action
    switch (action.type) {
        case Actions.STORE_PAGE_NAME:
            console.log('store hit', payload)
            return {
                ...state,
                pageName: payload.pageName
            }

        default:
            return state
    }

}