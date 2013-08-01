/**
 * util/index.js
 */
// ----[ Modules ]--------------------------------------------------------------
var fs = require('fs');

// ----[ Constants ]------------------------------------------------------------
const STACK_FORMAT=/^\s*at\s+(\S+)\s*\((.+):([0-9]+):([0-9]+)\)/

// ----[ Export Methods ]-------------------------------------------------------
module.exports = {
    requireChildren : requireChildren,
}

/**
 * require children
 *
 * @param   string  path to read
 * @return  object
 */
function requireChildren(path, stackCount) {
    stackCount = stackCount | 0;
    var children = [];
    var stack = (new Error().stack).split("\n");
    var calledFile;
    if (3 + stackCount <= stack.length) {
        calledFile = formatStack(stack[2 + stackCount]).file;
    }

    fs.readdirSync(path).each(function(fileName) {
        var parts = fileName.split('.');
        switch (parts.length) {
            case 1:
                // directory
                requireChildren(path + '/' + fileName, stackCount + 1).each(function(module) {
                    children.push(module);
                });
                break;
            case 2:
                // normal file
                var base = parts.shift();
                var ext  = parts.shift();
                var req  = path + '/' + base;
                if (ext === 'js' && req + '.js' !== calledFile) {
                    children.push(require(req));
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
 * format stack trace text
 *
 * @param   string
 * @return  object
 */
function formatStack(str)
{
    var match = STACK_FORMAT.exec(str);
    var ret   = {
        function : match[1],
        file     : match[2],
        line     : match[3],
        at       : match[4]
    };

    return ret;
}
