import Link from "next/link"
import { IProduct } from "../../types/types"
import Grid from '@mui/material/Grid'
import ProductPrice from "./ProductPrice"
import { FC } from "react"

export interface ProductListItemProps {
    product: IProduct,
}


const ProductListItem:FC<ProductListItemProps> = ({ product }) => {

    return (
        <Grid item xs={6} md={4} lg={3} key={product.id}>
            <div style={{marginBottom: '50px', textAlign: 'center'}}>
                <div style={{width:'80%', display: "inline-block"}}>
                    <Link href={`/product/${product.id}`}>
                        <div style={{cursor: 'pointer'}}>
                            <div>
                                <img src={product.image} style={{width:'100%'}}></img>
                            </div>
                            <div>
                                <a>{product.name}</a>
                            </div>
                        </div>
                    </Link>
                    <div style={{color: 'gray'}}>
                        <p>
                            Sizes: {product.sizes.join(', ')}
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

export default ProductListItem
