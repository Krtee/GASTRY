const User = require('../models/user');
const Category = require('../models/category');
const { errorHandler } = require('../helpers/dbErrorHandlers');



exports.createCategory = (req, res, next) => {
    const category = new Category(req.body);

    category.save((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err.message)
            })
        }
        res.json({
            data
        })
    })

}

exports.categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if(err || !category) {
            return res.status(400).json({
                error: errorHandler(err)
            }) 
        }
        req.category = category
        next();
    })

};

exports.readCategory = (req, res, next) => {
    return res.json(req.category);
}


exports.deleteCategory = (req, res, next) => {
    const category = req.category
    
    category.remove((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            message: 'Category Deleted'
        });

    })

}

exports.updateCategory = (req, res, next) => {
    const category = req.category
    category.name = req.body.name
    category.save((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data);

    })
}

exports.categoryList = (req, res, next) => {
    Category.find().exec((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: 'List of Category',
            data: data
        })
    })
}