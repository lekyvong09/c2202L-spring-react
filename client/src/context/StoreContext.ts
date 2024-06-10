import { createContext } from "react";
import { Basket } from "../model/basket";

interface StoreContextValue {
    basket: Basket | null;
    setBasket: (basket: Basket) => void;
    removeItem: (productId: number, quantity: number) => void;
}

export const StoreContext = createContext<StoreContextValue>({
    basket: null,
    setBasket: (basket: Basket) => {},
    removeItem: (productId: number, quantity: number) => {},
});