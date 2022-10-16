

module.exports = {
    up : (queryInterface, Sequelize) => {
        return queryInterface.createTable('Words', {
            id         : { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
            moduleId   : { type: Sequelize.UUID, allowNull: false  },
            term       : { type: Sequelize.STRING, allowNull: false },
            definition : { type: Sequelize.STRING, allowNull: false },
            imageUrl   : { type: Sequelize.STRING },
            stage      : { type: Sequelize.INTEGER, defaultValue: 1 },
            repeatAt   : { type: Sequelize.DATE,  allowNull: true, defaultValue: Sequelize.NOW },
            createdAt  : { type: Sequelize.DATE, allowNull: false },
            updatedAt  : { type: Sequelize.DATE, allowNull: false }
        });
    },

    down : (queryInterface) => {
        return queryInterface.dropTable('Words');
    }
};
