const exportss = module.exports = {}

exports.signup = function(req, res) {

    res.render('signup');

}
exportss.signin = function(req, res) {

    res.render('signin');

}

exportss.orders = function(req, res) {

    res.render('orders');

}
exportss.logout = function(req, res) {

    req.session.destroy(function(err) {

        res.redirect('/');

    });

}