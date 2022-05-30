const db = require("../models");
const Quote = db.quote;
const Op = db.Sequelize.Op;

exports.findAuthors = async (author) => {
    let query = {};
    let where = {};

    if (author) {
        where = {
            where: db.sequelize.where(db.sequelize.fn('INSTR',
                db.sequelize.fn('LOWER', db.sequelize.col('author')),
                author.toLowerCase()), { [Op.gt]: 0 })
        };
    }

    query = {
        attributes: ['author'],
        where: where,
        group: db.sequelize.fn('LOWER', db.sequelize.col('author')),
        order: db.sequelize.col('author')
    };

    return new Promise((resolve, reject) => {
        Quote.findAll(query)
            .then(data => resolve(data))
            .catch(err => reject(err));
    });
}

exports.findById = async (id) => {
    return new Promise((resolve, reject) => {
        Quote.findByPk(id)
            .then(data => resolve(data))
            .catch(err => reject(err));
    });
}

exports.findOneRandomly = async () => {
    return new Promise((resolve, reject) => {
        Quote.findOne({ order: db.sequelize.random() })
            .then(data => resolve(data))
            .catch(err => reject(err));
    });
}

exports.find = async (str, author) => {
    let query = {};
    const where = (col, s) => {
        return db.sequelize.where(db.sequelize.fn('INSTR',
            db.sequelize.fn('LOWER', db.sequelize.col(col)),
            s.toLowerCase()), { [Op.gt]: 0 });
    }

    if (author) {
        if (str) {
            // quote AND author
            query = { where: { [Op.and]: [where('quote', str), where('author', author)] } };
        } else {
            // author
            query = { where: where('author', author) };
        }
    } else if (str) {
        // quote OR author
        query = { where: { [Op.or]: [where('quote', str), where('author', str)] } };
    }

    query.order = db.sequelize.col('author');

    return new Promise((resolve, reject) => {
        Quote.findAll(query)
            .then(data => resolve(data))
            .catch(err => reject(err));
    });
}
