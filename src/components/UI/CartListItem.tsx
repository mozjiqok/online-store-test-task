import Link from "next/link"
import { ICartProduct } from "../../types/types"
import { FC } from "react"
import { removeFromLocalCart } from "../../utils/cart"
import { useCartContext } from "../../context"
import Grid from '@mui/material/Grid'
import ProductPrice from "./ProductPrice"
import styles from '../../styles/CartListItem.module.scss'

interface CartListItemProps {
    product: ICartProduct,
}

const CartListItem: FC<CartListItemProps> = ({ product }) => {

    const { setCart } = useCartContext()

    const removeFromCartBtn = () => {
        setCart(removeFromLocalCart(product.id, product.size))
    }
    
    return (
        <Grid item xs={6} md={4} lg={3} key={product.id}>
            <div className={styles.cart_item}>
                <div style={{width:'80%', display: "inline-block"}}>
                    <div style={{cursor: 'pointer'}}>
                        <div className={styles.img_wrapper}>
                            <img src={product.image} style={{width:'100%'}}></img>
                            <div className={styles.remove_btn_wrapper} onClick={removeFromCartBtn}>
                                <span>Remove from Cart</span>
                            </div>
                        </div>
                        <Link href={`/product/${product.id}`}>
                            <span>{product.name}</span>
                        </Link>
                    </div>
                    <div style={{color: 'gray'}}>
                        <p>
                            Size: {product.size}
                        </p>
                        <p>
                            Price: <ProductPrice price={product.price} special={product.special} />
                        </p>
                    </div>
                </div>
            </div>
        </Grid>
    )
}

export default CartListItem
