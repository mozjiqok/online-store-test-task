import { ICartProduct } from "../types/types"

export const getLocalCart = ():ICartProduct[] => {
    let cart = []
    if (!localStorage.cart) return []
    try {
        cart = JSON.parse(localStorage.cart)
    }
    catch (e) {
        console.log(e)
    }
    finally {
        return cart
    }
}

export const addToLocalCart = (product: ICartProduct):ICartProduct[] => {
    const cart = getLocalCart()
    const newCart = [...cart, product]
    localStorage.setItem('cart', JSON.stringify(newCart))
    return newCart
}

export const removeFromLocalCart = (productId: number, size: string):ICartProduct[] => {
    const cart = getLocalCart()
    const newCart = cart.filter(product => !(product.id === productId && product.size === size))
    localStorage.setItem('cart', JSON.stringify(newCart))
    return newCart
}

export const emptyLocalCart = ():ICartProduct[] => {
    localStorage.removeItem('cart')
    return []
}