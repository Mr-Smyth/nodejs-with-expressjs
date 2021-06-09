exports.get404 = (req, res, next) => {
    res.render('404', {
        pageTitle: 'Error - 404',
        path: '/404',
    });
};

exports.get500 = (req, res, next) => {
    res.render('500', {
        pageTitle: 'Error - 500 - Things have really gone south!!',
        path: '/500',
    });
};