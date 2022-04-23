import Error from 'next/error'
import { FC, useEffect, useState } from 'react'
import { addToLocalCart, removeFromLocalCart } from '../../utils/cart'
import { IProduct } from "../../types/types"
import { useCartContext } from '../../context'
import MainContainer from '../../components/MainContainer'
import PageHeader from '../../components/UI/PageHeader'
import { GetServerSideProps } from 'next'
import styles from '../../styles/Product.module.scss'
import Button from '@mui/material/Button'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { decode } from 'html-entities'
import ProductPrice from '../../components/UI/ProductPrice'


interface ProductProps {
    errorCode?: number | null,
    product: IProduct
}

const Product:FC<ProductProps> = ({errorCode, product}) => {
    const [inCart, setInCart] = useState(false)
    const [selectedSize, setSelectedSize] = useState('')
    const [mounted, setMounted] = useState(false)
    const { cart, setCart } = useCartContext()

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        const isInCart = cart.find(cartProduct => {
            return cartProduct.id === product.id && cartProduct.size === selectedSize
        })
        setInCart(!!isInCart)
    }, [selectedSize])


    const toggleInCartClick = () => {
        if (inCart) {
            setInCart(false)
            setCart(removeFromLocalCart(product.id, selectedSize))
        } else {
            if (!selectedSize) {
                return
            }
            setInCart(true)
            setCart(addToLocalCart({...product, size: selectedSize}))
        }
    }
    const handleSizeChange = (
        event: React.MouseEvent<HTMLElement>,
        newSize: string,
    ) => {
        setSelectedSize(newSize)
    }

    if (errorCode) return <Error statusCode={errorCode} />

    return (
        <MainContainer title={product.name}>
            <div className={styles.page_wrapper}>
                <div className={styles.img_wrapper}>
                    <img src={product.image} ></img>
                </div>
                <div className={styles.text_wrapper}>
                    <PageHeader text={product ? product.name : ''} />
                    <div>Model: {product.model}</div>
                    <div>Price: <ProductPrice price={product.price} special={product.special} /></div>
                    {
                        (product && product.sizes && mounted) ?
                        <div>
                            Select your size:{" "}
                            <ToggleButtonGroup
                                exclusive
                                value={selectedSize}
                                onChange={handleSizeChange}
                            >
                                {product.sizes.map(
                                    size => (
                                        <ToggleButton key={size} value={size}>
                                            {size}
                                        </ToggleButton>
                                    )
                                )}
                            </ToggleButtonGroup>
                        </div> :
                        null
                    }
                    <Button variant="contained" color={inCart ? "secondary" : "success"} onClick={toggleInCartClick} disabled={!selectedSize}>{inCart ? 'Remove from cart' : 'Add to cart'}</Button>
                    <p>Descripton: {mounted ? <span dangerouslySetInnerHTML={{__html: decode(product.description)}} /> : null}</p>
                </div>
            </div>
        </MainContainer>
    )
}

export default Product

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    try {
        const id = params ? params.id : ''
        const response = await fetch(`http://localhost:3000/product/${id}`)
        const product = await response.json()
        let errorCode = null
        if (!product.name) errorCode = 404;
    
    
        return {
            props: {
                errorCode,
                product,
            },
        }
    }
    catch (e) {
        console.log(e)
        return {
            props: {
                product: {},
            },
        }
    }
}