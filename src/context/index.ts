import { createContext, useContext } from "react"
import { ICartProduct } from "../types/types";

type CartContext = {
    cart: ICartProduct[]
    setCart: (cart: ICartProduct[]) => void
}

export const CartContext = createContext<CartContext>({cart: [], setCart: () => {}})

export const useCartContext = () => useContext(CartContext)