import { GetServerSideProps } from "next"
import MainContainer from "../../components/MainContainer"

const OrderComplete = ({ orderId }: any) => {

    return (
        <MainContainer title="Order completed">
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '500px'}}>
                <h1>Your order #{orderId} is received!</h1>
            </div>
        </MainContainer>
    )
}

export default OrderComplete

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const id = params ? params.id : ''

    return {
        props: {
            orderId: id
        },
    }
}