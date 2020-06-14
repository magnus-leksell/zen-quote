module.exports = (sequelize, Sequelize) => {
    const Quote = sequelize.define('quote', {
        // attributes
        author: {
            type: Sequelize.STRING,
            allowNull: false
        },
        quote: {
            type: Sequelize.TEXT,
            allowNull: false
        }
    }, {
        // options
        timestamps: false
    });

    return Quote;
};