import { GetServerSideProps } from "next"
import { FC } from "react"
import MainContainer from "../components/MainContainer"
import PageHeader from "../components/UI/PageHeader"
import ProductList from "../components/UI/ProductList"
import { IProduct } from "../types/types"

interface ShopProps {
    products: IProduct[],
    pageCount?: number,
    page?: number,
}

const Shop:FC<ShopProps> = (props) => {
    return (
        <MainContainer title="Shopping page">
            {props.products.length ? (
                <>
                    <PageHeader text="Shopping page" />
                    <ProductList {...props}/>
                </>
            ) : (
                <PageHeader text="Service is unavailable, server didn't respond" />
            )}
        </MainContainer>
    )
}

export default Shop

export const getServerSideProps: GetServerSideProps = async (context) => {
    const page = (context && context.query && context.query.page) ? +context.query.page : 1
    try {
        const response = await fetch(`http://localhost:3000/product?page=${page}`)
        const { data: products, pageCount } = await response.json()
        return {
            props: {
                products,
                pageCount,
                page
            },
        }
    }
    catch (e) {
        console.log(e)
        return {
            props: {
                products: [],
                pageCount: 1,
                page
            },
        }
    }

}
