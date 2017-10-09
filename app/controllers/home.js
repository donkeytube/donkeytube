var db = require('../services/db');

var homeController = {};

homeController.index = function(req, res){
    var result = {};
    var sql = 'SELECT * FROM `search_top_20_released`';
    db.exec(sql, null, (err, data) => {
        result.resultTop20Release = data;
        var sql = 'SELECT * FROM `search_top_20_views`';
        db.exec(sql, null, (err, data) => {
            result.resultTop20Views = data;
            res.render('home', result);
        });
    });
};

module.exports = homeController;
