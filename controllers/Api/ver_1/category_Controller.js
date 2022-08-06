
const maincat = require('../../../models/main_Category');
const subcat = require('../../../models/sub_Category');

module.exports.mainCategoryPage = (req, res) => {
    return res.render('mainCategoryPage');
}

module.exports.subCategoryPage = (req, res) => {
    maincat.find({}, (err, data) => {
        if (err) {
            console.log('data not found' + err);
            return false;
        }
        return res.render('subCategoryPage', {
            'data': data
        });
    })
}

module.exports.addMainCat = (req, res) => {
    maincat.create(req.body, (err) => {
        if (err) {
            console.log('maincat data not added' + err);
            return false;
        }
        return res.redirect('back');
    })
}

module.exports.addSubCat = (req, res) => {
    subcat.create(req.body, (err) => {
        if (err) {
            console.log('subcatData not added' + err);
            return false
        }
        return res.redirect('back');
    })
}

module.exports.viewcatData = (req, res) => {
    subcat.find({}).populate('categoryID').exec((err, data) => {
        if (err) {
            console.log('data not found');
            return false;
        }
        return res.render('viewcatData', {
            'data': data
        })
    })
}