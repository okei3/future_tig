module.exports = function (io, modules) {
    modules.util.requireChildren(__dirname).each(function(route) {
        route(io, modules);
    });
};
