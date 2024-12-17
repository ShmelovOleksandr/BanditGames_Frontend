import {Card, CardHeader, CardBody, Image} from '@nextui-org/react'

interface HomeCardProps {
    title: string;
    subtitle?: string;
    description: string;
    imageSrc?: string;
}

function HomeCard({title, subtitle, description, imageSrc}: HomeCardProps) {
    return (
        <Card className="bg-secondary-800 py-4 w-[300px]">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                {subtitle && <p className="text-tiny uppercase font-bold">{subtitle}</p>}
                <small className="text-default-500">{description}</small>
                <h4 className="font-bold text-large">{title}</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                {imageSrc && (
                    <Image
                        alt={`${title} image`}
                        className="object-cover rounded-xl"
                        src={imageSrc}
                        width={270}
                    />
                )}
            </CardBody>
        </Card>
    )
}

export default HomeCard
