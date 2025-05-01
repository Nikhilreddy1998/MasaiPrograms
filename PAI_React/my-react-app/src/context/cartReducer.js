export const cartReducer =(state,action)=>{
    switch(action.type){
        case 'ADD_TO_CART':
            const existingItem=state.cartItems.find((item)=>item.id===action.payload.id)
    }
}