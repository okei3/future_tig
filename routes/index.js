module.exports = function (app, modules) {
    var children  = modules.util.requireChildren(__dirname);
    var prototype = {modules: modules};
    children.each(function(Router) {
        Router.prototype = prototype;
        new Router().route(app);
    });
};
