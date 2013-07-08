_ = require('underscore');
module.exports = function (app, modules) {
    prototype = {modules: modules};
    var files = ['login', 'lobby'];
    _.each(files, function (file) {
        Router = require('./' + file);
        Router.prototype = prototype;
        new Router().route(app);
    });
    require('./top')(app, modules);
    require('./logout')(app, modules);
    require('./home')(app, modules);
};
