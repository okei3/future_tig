_ = require('underscore');
module.exports = function () {
    var files = ['game', 'map', 'player'];
    var mod = {};
    _.each(files, function (file) {
        mod[file] = require('./' + file);
    });
    return mod;
};
