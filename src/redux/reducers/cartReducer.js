


const initialState = {
    items: [] //  { productId, quantity }
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            const existingItem = state.items.find(item => item.productId === action.payload.productId);
            if (existingItem) {
                // если товар уже есть — увеличить количество
                return {
                    ...state,
                    items: state.items.map(item =>
                        item.productId === action.payload.productId
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    )
                };
            } else {
                // иначе добавить новый товар
                return {
                    ...state,
                    items: [
                        ...state.items,
                        {
                            productId: action.payload.productId,
                            quantity: 1,
                            image: action.payload.image,
                            title: action.payload.title
                        }
                    ]
                };
            }

        case "REMOVE_FROM_CART":
            return {
                ...state,
                items: state.items.filter(item => item.productId !== action.payload.productId)
            };

        case "CLEAR_CART":
            return {
                ...state,
                items: []
            };

        default:
            return state;
    }
};
