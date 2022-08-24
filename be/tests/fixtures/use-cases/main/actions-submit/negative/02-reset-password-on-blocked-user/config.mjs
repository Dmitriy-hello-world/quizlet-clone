

export default {
    before : async (factory) => {
        await factory.standardSetup();
        const users  = await factory.setupUsers();
        const userId = users[2].id;

        return { userId };
    }
};
