var Exception = (function() {
    function Exception(msg, context) {
        this.msg     = msg;
        this.context = (context === undefined) ? {} : context;
    }
    return Exception;
})();
module.exports = Exception;
