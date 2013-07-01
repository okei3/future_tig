module.exports = function (io, modules) {
    require('./ready')(io, modules);
    require('./chat')(io, modules);
};
