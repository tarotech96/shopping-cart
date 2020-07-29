const ACTION_NAME = {
    ADD_TO_CART: 'ADD_TO_CART'
}

const actions = {
    addToCart: (data) => {
        return {
            type: ACTION_NAME.ADD_TO_CART,
            payload: data
        }
    }
}

export default actions;