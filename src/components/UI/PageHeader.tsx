import { FC } from "react"

interface PageHeaderProps {
    text: string,
}

const PageHeader: FC<PageHeaderProps> = ({ text }) => {
    
    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <h1 style={{padding: '30px 0'}}>
                {text}
            </h1>
        </div>
    )
}

export default PageHeader
