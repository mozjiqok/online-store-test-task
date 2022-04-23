import CartListItem from "./CartListItem"
import { FC } from "react"
import { useCartContext } from '../../context'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

const CartList:FC = () => {

    const { cart } = useCartContext()
    
    return (
        cart.length ?
        (
            <Box sx={{ flexGrow: 1 }}>
                <Grid container columns={12}>
                    {
                        cart.map(product =>
                            <CartListItem key={product.id+product.size} product={product} />
                        )
                    }
                </Grid>
            </Box>
         ) : (
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <span>Your cart is empty</span>
            </div>
         )
    )
}

export default CartList

