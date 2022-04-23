import { FC } from "react"
import { IProduct } from "../../types/types"

interface ProductPriceProps {
    price: string,
    special: string,
}

const ProductPrice: FC<ProductPriceProps> = ({ price, special }) => {
    
    return (
        <span>
            <span style={{textDecorationLine: 'line-through', fontSize: '90%'}}>
                {price}
            </span>{" "}
            <span style={{color: '#f97369'}}>
                {special}
            </span>
        </span>
    )
}

export default ProductPrice
