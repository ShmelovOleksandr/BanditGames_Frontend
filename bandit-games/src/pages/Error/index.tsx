import Error from '@/layouts/error.tsx'
import SectionComponent from '@/components/Section'
import {subtitle, title} from '@/components/primitives.ts'
import ButtonComponent from '@/components/Button'

export const NotFound: React.FC = () => {
    return (
        <Error>
            <SectionComponent className="flex flex-col items-center justify-center gap-4 py-4 m-0">
                <p className={title({color: 'white'}) + ' text-center'}>
                    The site is currently down for maintenance.
                </p>

                <img
                    src="/error.gif"
                    alt="Maintenance in progress"
                    className="w-64 h-auto"
                />

                <p className={subtitle({color: 'muted'}) + ' text-center'}>
                    We're giving our site a little extra polish, but we'll be back better
                    than ever soon!
                </p>
                <ButtonComponent link="/" text="Home"/>
            </SectionComponent>
        </Error>
    )
}

export default NotFound
