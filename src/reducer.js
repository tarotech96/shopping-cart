import Item1 from './images/dog1.jpg';
import Item2 from './images/dog2.jpg';
import Item3 from './images/dog3.jpeg';
import Item4 from './images/dog4.jpeg';
const initialState = {
    items: [
        { id: 1, title: 'Winter body', desc: "This is item one", price: 110, img: Item1, count: 0 },
        { id: 2, title: 'Adidas', desc: "This is item two", price: 80, img: Item2, count: 0  },
        { id: 3, title: 'Vans', desc: "This is item third", price: 120, img: Item3, count: 0  },
        { id: 4, title: 'White', desc: "This is item fourth", price: 260, img: Item4, count: 0  }
    ],
    addedItems: [
    ],
    total: 0,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            var addedItem = action.payload;
            var checkItem = state.addedItems.find(x => x.id === addedItem.id);
            if (checkItem) {
                return {
                    ...state,
                    total: state.total += 1,
                    count: addedItem.count += 1
                }
            } else {
                var { addedItems } = state;
                addedItems.push(addedItem);
                return {
                    ...state,
                    addedItems: addedItems,
                    total: state.total += 1,
                    count: addedItem.count += 1
                }
            }

        default:
            return state;
    }
}

export default reducer;