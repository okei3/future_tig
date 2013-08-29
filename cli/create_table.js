var clystal = require('clystal').init(require('../conf/' + process.env.NODE_ENV));
var argv    = process.argv;
// remove 'node'
argv.shift();

// remove 'file name'
argv.shift();

try {
    argv.each(function(scheme) {
        console.log(scheme);
        var ac = clystal.getAccessor(scheme);
        ac.createDB()(function(ret) {
            ac.execute('createTable', {})(function(err, ret) {
                if (ret.warningCount === 0) {
                    console.log('- create');
                } else {
                    console.log('- already exists');
                }
            });
        });
    });
} catch (e) {
    console.log('[EXCEPTION]');
    console.log(e);
    console.log(new Error().stack);
}
