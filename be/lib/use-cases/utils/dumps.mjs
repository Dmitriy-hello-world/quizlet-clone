import { generateImagesURL } from './imagesURLGeneration.mjs';

export function dumpUser(user) {
    const dump = {
        id         : user.id,
        email      : user.email,
        firstName  : user.firstName,
        secondName : user.secondName,
        avatarUrl  : user.avatar ? generateImagesURL(user.avatar) : '',
        modules    : user?.modules?.map(dumpModule),
        createdAt  : user.createdAt.toISOString(),
        updatedAt  : user.updatedAt.toISOString()
    };

    return dump;
}

export function dumpWord(word) {
    return {
        id         : word.id,
        moduleId   : word.moduleId,
        term       : word.term,
        definition : word.definition,
        imageUrl   : word.imageUrl,
        createdAt  : word.createdAt.toISOString(),
        updatedAt  : word.updatedAt.toISOString()
    };
}

export function dumpModule(module) {
    return {
        id                : module.id,
        userId            : module.userId,
        name              : module.name,
        description       : module.description,
        private           : module.private,
        editedByOutsiders : module.editedByOutsiders,
        createdAt         : module.createdAt.toISOString(),
        updatedAt         : module.updatedAt.toISOString()
    };
}
