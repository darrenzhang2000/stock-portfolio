import Actions from './actions'

export function storePageName(pageName) {
    console.log('store page naem called')
    return {
        type: Actions.STORE_PAGE_NAME,
        payload: {
            pageName
        }
    }
}
