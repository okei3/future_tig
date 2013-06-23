module.exports = function (app, modules) {
    require('./top')(app, modules);
    require('./login')(app, modules);
    require('./home')(app, modules);
};
