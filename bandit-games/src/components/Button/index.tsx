import {Button} from '@nextui-org/button'
import {useNavigate} from 'react-router-dom'

interface ButtonType {
    link?: string;
    text: string;
}

const ButtonComponent: React.FC<ButtonType> = ({link, text}) => {
    const navigate = useNavigate()
    return (
        <Button
            className="text-sm font-normal text-default-600 bg-default-100"
            variant="flat"
            onClick={() => navigate(link)}
        >
            {text}
        </Button>
    )
}
export default ButtonComponent
