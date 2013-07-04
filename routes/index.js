module.exports = function (app, modules) {
    prototype = {modules: modules};
    App = require('./login');
    App.prototype = prototype;
    new App().route(app);
    require('./top')(app, modules);
    require('./logout')(app, modules);
    require('./home')(app, modules);
};
