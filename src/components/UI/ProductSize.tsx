import { FC } from "react"
import Button from '@mui/material/Button'

interface ProductSizeProps {
    size: string,
    selectedSize: string,
    setSelectedSize: (size: string) => void
}

const ProductSize: FC<ProductSizeProps> = ({ size, setSelectedSize, selectedSize }) => {

    const sizeClick = () => {
        setSelectedSize(size)
    }
    
    return (
        <Button onClick={sizeClick} disabled={size === selectedSize}>{size} </Button>
    )
}

export default ProductSize
