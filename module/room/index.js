_ = require('underscore');
module.exports = function (param) {
    var files = ['repository'];
    var mod = {};
    _.each(files, function (file) {
        constructor = require('./' + file);
        constructor.prototype = param;
        mod[file] = constructor;
    });
    return mod;
};
