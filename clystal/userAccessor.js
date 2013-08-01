module.exports = (function() {
    var UserAccessor = require('../lib/clystal').createCustomAccessor();

    /**
     * get by user id by cache or DB
     *
     * @param   int
     * @param   bool    flag to use DB force
     * @return  function
     */
    UserAccessor.prototype.getByUserId = function(userId, useDB) {
        useDB = useDB || false;

        if (!useDB) {
            // see cache
            // return if exists
        }

        return this.get(userId);
    }

    return UserAccessor;
})();
