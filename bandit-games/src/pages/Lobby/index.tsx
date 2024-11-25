import DefaultLayout from '@/layouts/default.tsx'
import SectionComponent from '@/components/Section'

export const Lobby: React.FC = () => {
    return (
        <DefaultLayout>
            <SectionComponent>
                <h1>Lobby</h1>
            </SectionComponent>
        </DefaultLayout>
    )
}
export default Lobby
