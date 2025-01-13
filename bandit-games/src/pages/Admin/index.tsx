import DefaultLayout from "@/layouts/default.tsx";
import SectionComponent from "@/components/Section";
import ExportStatistics from "@/components/ExportStatistics";
import PlayerDataGenerator from "@/components/PlayerDataGenerator";
import PlayerList from "@/components/PlayerList";
import {title} from "@/components/primitives.ts";


export default function Admin() {


    return (
            <DefaultLayout>
                <SectionComponent>
                    <div className="flex flex-wrap items-center justify-between w-full">
                        <p className={title({color: 'white'})}>Admin page</p>
                    </div>
                    <hr className="my-4 border-white"/>
                    <SectionComponent className="p-6">
                        <ExportStatistics/>
                    </SectionComponent>
                    <SectionComponent className="p-6">
                        <PlayerDataGenerator/>
                    </SectionComponent>
                    <SectionComponent className="p-6">
                        <PlayerList/>
                    </SectionComponent>
                </SectionComponent>
            </DefaultLayout>
    )
}