import CartList from "../components/UI/CartList"
import { useMemo, useState } from "react"
import { emptyLocalCart } from "../utils/cart"
import { useRouter } from 'next/router'
import { useCartContext } from "../context"
import MainContainer from "../components/MainContainer"
import PageHeader from "../components/UI/PageHeader"
import Button from '@mui/material/Button'
import ProductPrice from "../components/UI/ProductPrice"

const Cart = () => {

    const [requesting, setRequesting] = useState(false)
    const router = useRouter()
    const { cart, setCart } = useCartContext()
    const [ total, specialTotal ] = useMemo(() => {
        let totalInCents = 0,
            specialTotalInCents = 0;
        cart.forEach(el => {
            totalInCents += el.priceInCents
            specialTotalInCents += el.specialInCents
        })
        const total = '$' + (totalInCents * 0.01).toFixed(2)
        const specialTotal = '$' + (specialTotalInCents * 0.01).toFixed(2)
        return [ total, specialTotal ];
    }, [cart])

    async function postOrder() {
        const products = cart.map(el => {return {id: el.id, size: el.size}})
        if (!products.length) return
        const res = await fetch('http://localhost:3000/checkout/placeOrder', {
            method: 'POST',
            body: JSON.stringify({products}),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await res.json()
        const { orderId } = data
        await router.push('/orderComplete/' + orderId)
    }

    const handlePlaceOrder = () => {
        setRequesting(true)
        postOrder()
        .then(() => {
            setRequesting(false)
            setCart(emptyLocalCart())
        })
    }

    
    return (
        <MainContainer title="Cart">
            <PageHeader text="Cart" />
                {
                    cart.length ?
                    (
                        <div style={{display: 'flex', justifyContent: 'center', marginBottom: '50px'}}>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '400px'}}>
                                <span>
                                    Total amount: <ProductPrice price={total} special={specialTotal} />
                                </span>
                                <Button
                                    variant="contained"
                                    color="success"
                                    onClick={handlePlaceOrder}
                                    disabled={requesting}
                                >
                                    Place an order
                                </Button>
                            </div>
                        </div>
                    ) : null
                }
            <CartList />
        </MainContainer>
    )
}

export default Cart
