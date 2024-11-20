import {faker} from "@faker-js/faker";

export const generateFakeUsers = (count: number) => {
    return Array.from({length: count}, () => ({
        name: faker.name.fullName(),
        description: faker.internet.userName(),
        avatarSrc: faker.image.avatar(),
    }));
};
