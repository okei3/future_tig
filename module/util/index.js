/**
 * util/index.js
 */
// ----[ Modules ]--------------------------------------------------------------
var fs = require('fs');

// ----[ Export Methods ]-------------------------------------------------------

/**
 * require children
 *
 * @param   string  path to read
 * @return  object
 */
function requireChildren(path) {
    var children = {};
    fs.readdirSync(path).each(function(fileName) {
        var parts = fileName.split('.');
        switch (parts.length) {
            case 1:
                // directory
                if (children.hasKey(fileName)) {
                    // not override key
                    break;
                }
                var indexFile = path + '/' + fileName + '/index.js';
                if (fs.existsSync(indexFile)) {
                    children[fileName] = require(path + '/' + fileName);
                }
                break;
            case 2:
                // normal file
                var base = parts.shift();
                var ext  = parts.shift();
                if (ext === 'js' && base !== 'index') {
                    children[base] = require(path + '/' + base);
                }
                break;
            default:
                // do nothing
                break;
        }
    });

    return children;
}

/**
 * child modules
 */
var modules = requireChildren(__dirname);
modules.requireChildren = requireChildren;

module.exports = modules;
