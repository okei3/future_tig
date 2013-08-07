const SALT_PREFIX = 'quartz';
const SALT_SUFFIX = 'keiichikun';

var userAccessor = require('clystal').getAccessor('user');

module.exports = {
    get : function(userId) {
        return userAccessor.getByUserId(userId);
    },

    authenticate : function (mail, pass) {
        var params = {mail: mail};
        return function(cb) {
            userAccessor.findFirst('findByMail', params)(function(err, ret) {
                if (err) {
                    cb(err, ret);
                } else {
                    if (ret.pass === hashPass(pass)) {
                        cb(err, ret.user_id);
                    } else {
                        cb(err, null);
                    }
                }
            });
        }
    },

    register : function(name, mail, pass) {
        var params = {
            name: name,
            mail: mail,
            pass: hashPass(pass),
        }
        return userAccessor.execute('insert', params);
    },
};

function hashPass(pass) {
    return require('crypto')
        .createHash('sha256')
        .update(SALT_PREFIX + pass + SALT_SUFFIX)
        .digest('hex');
}
