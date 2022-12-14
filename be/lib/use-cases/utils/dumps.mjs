export function dumpUser(user) {
    const dump = {
        id         : user.id,
        email      : user.email,
        firstName  : user.firstName,
        secondName : user.secondName,
        lang       : user?.lang,
        avatarUrl  : user.avatar,
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
        repeatAt   : word.repeatAt.toISOString(),
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
