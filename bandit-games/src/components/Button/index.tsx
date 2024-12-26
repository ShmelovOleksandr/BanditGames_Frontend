import {Button} from '@nextui-org/button'
import {useNavigate} from 'react-router-dom'

interface ButtonType {
    link?: string;
    text: string;
    actionClick?: () => void;
}

function ButtonComponent({link, text, actionClick}: ButtonType) {
    const navigate = useNavigate()

    const handleClick = () => {
        if (actionClick) {
            actionClick()
        } else if (link) {
            navigate(link)
        }
    }

    return (
        <Button
            className="text-sm font-normal text-default-600 bg-default-100"
            variant="flat"
            onClick={handleClick}
        >
            {text}
        </Button>
    )
}

export default ButtonComponent
