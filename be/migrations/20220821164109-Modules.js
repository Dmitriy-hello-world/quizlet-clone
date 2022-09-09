

module.exports = {
    up : (queryInterface, Sequelize) => {
        return queryInterface.createTable('Modules', {
            id                : { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
            userId            : { type: Sequelize.UUID, allowNull: false },
            name              : { type: Sequelize.STRING, allowNull: false },
            description       : { type: Sequelize.TEXT('tiny'), allowNull: true },
            private           : { type: Sequelize.BOOLEAN, defaultValue: true },
            editedByOutsiders : { type: Sequelize.BOOLEAN, defaultValue: false },
            createdAt         : { type: Sequelize.DATE, allowNull: false },
            updatedAt         : { type: Sequelize.DATE, allowNull: false }
        });
    },

    down : (queryInterface) => {
        return queryInterface.dropTable('Modules');
    }
};
