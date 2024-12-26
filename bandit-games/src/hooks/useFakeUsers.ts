import {faker} from '@faker-js/faker'

interface User {
    name: string;
    description: string;
    avatarSrc: string;
}

export const useFakeUsers = (count: number): User[] => {
    return Array.from({length: count}, () => ({
        name: faker.name.fullName(),
        description: faker.internet.userName(),
        avatarSrc: faker.image.avatar(),
    }))
}
