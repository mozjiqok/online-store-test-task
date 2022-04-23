import { FC, ReactNode } from "react"
import Head from 'next/head'
import Container from '@mui/material/Container'

interface MainContainerProps {
    title: string;
    children: ReactNode;
}

const MainContainer: FC<MainContainerProps> = ({ title, children }) => {

    return (
        <Container maxWidth="xl">
            <Head>
                <meta></meta>
                <title>{title} | OMG SHOP</title>
            </Head>
            {children}
        </Container>
    )
}

export default MainContainer
