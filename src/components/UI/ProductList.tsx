import { IProduct } from "../../types/types"
import { useRouter } from "next/router"
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import ProductListItem from "./ProductListItem"
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { FC } from "react"

export interface ProductListProps {
    products: IProduct[],
    pageCount?: number,
    page?: number,
}


const ProductList:FC<ProductListProps> = ({ products, pageCount, page }) => {
    
    const router = useRouter()
    
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        router.push('/shop?page=' + value)
    };
    
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container columns={12}>
                    {products.map(product =>
                        <ProductListItem key={product.id} product={product} />
                    )}
                </Grid>
            </Box>
            <div style={{marginBottom: "50px", display: "flex", justifyContent: "center"}}>
                <Stack spacing={2}>
                    <Pagination count={pageCount} page={page} hidePrevButton hideNextButton onChange={handlePageChange} />
                </Stack>
            </div>
        </div>
    )
}

export default ProductList
