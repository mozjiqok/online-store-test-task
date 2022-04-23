import NavBar from '../components/UI/NavBar'
import type { AppProps } from 'next/app'
import '../styles/global.css'
import { CartContext } from '../context'
import { useState } from 'react'
import { ICartProduct } from '../types/types'

export default function MyApp({ Component, pageProps } : AppProps) {
    const [cart, setCart] = useState<ICartProduct[]>([])

    return <CartContext.Provider value={{cart, setCart}}>
        <NavBar />
        <Component {...pageProps} />
    </CartContext.Provider>
}