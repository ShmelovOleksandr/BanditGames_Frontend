import {User} from "@nextui-org/react";

interface UserProps {
    name: string;
    description: React.ReactNode;
    avatarSrc: string;
}

const CustomUser: React.FC<UserProps> = ({name, description, avatarSrc}) => {
    return (
        <User
            name={name}
            description={description}
            avatarProps={{
                src: avatarSrc,
            }}
        />
    );
};

export default CustomUser;
