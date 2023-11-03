import React, { createContext, useContext, useReducer, useEffect } from "react";

// Define the types for cart items and the context
type CartItem = {
    id: number;
    name: string;
    price: number;
    amount: string;
    nfts: [];
    utxo: string;
}
type CartContextType = {
    cartData: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (item: CartItem) => void;
    removeAllCart: () => void;
};

// Create the CartContext with an initial value of an empty array and functions
const CartContext = createContext<CartContextType>({
    cartData: [],
    addToCart: () => { },
    removeFromCart: () => { },
    removeAllCart: () => { },
});

// Define the cart reducer function
const cartReducer = (state: CartItem[], action: { type: string; payload: CartItem }) => {
    switch (action.type) {
        case "ADD_TO_CART":
            console.log("item", action.payload)
            return [...state, action.payload];
        case "REMOVE_FROM_CART":
            console.log("state", state)

            console.log("item", action.payload)
            console.log("state.filter((item) => item.utxo !== action.payload.utxo)", state.filter((item) => item.utxo !== action.payload.utxo))
            return state.filter((item) => item.utxo !== action.payload.utxo);

        case "REMOVE_ALL":
            return [];
        // Add other cases for cart manipulation as needed
        default:
            return state;
    }
};

const placeholderCartItem: CartItem = {
    id: -1,
    name: "",
    price: 0,
    amount: "",
    nfts: [],
    utxo: "",
};

// Create a CartProvider component to wrap your app
export function CartProvider({ children }: { children: React.ReactNode }) {
    // Initialize cartData with data from local storage
    const [cartData, dispatch] = useReducer(cartReducer, [], () => {
        const storedData = localStorage.getItem("ttt-data");
        return storedData ? JSON.parse(storedData) : [];
    });

    // Update local storage whenever cartData changes
    useEffect(() => {
        localStorage.setItem("ttt-data", JSON.stringify(cartData));
    }, [cartData]);

    // Define the addToCart and removeFromCart functions
    const addToCart = (item: CartItem) => {
        dispatch({ type: "ADD_TO_CART", payload: item });
    };

    const removeFromCart = (item: CartItem) => {
        dispatch({ type: "REMOVE_FROM_CART", payload: item });
    };
    // Add the removeAllCart function
    const removeAllCart = () => {
        dispatch({ type: "REMOVE_ALL", payload: placeholderCartItem  }); // Provide an empty object as the payload
    };

    return (
        <CartContext.Provider value={{ cartData, addToCart, removeFromCart, removeAllCart }}>
            {children}
        </CartContext.Provider>
    );
}

// Create a custom hook for accessing cart data and functions
export function useCart() {
    return useContext(CartContext);
}
