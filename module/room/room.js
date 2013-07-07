_ = require('underscore');
module.exports =  function (id, name) {
    var member_ids = [];
    this.getId  =  function () {
        return id;
    };
    this.getName = function () {
        return name;
    };
    this.setName = function (new_name) {
        name = new_name;
    };
    this.hasMember = function (member_id) {
        return _.contains(member_ids, member_id);
    };
    this.addMember = function (member_id) {
        if (!this.hasMember(member_id)) {
            member_ids.push(member_id);
        }
    };
    this.removeMember = function (member_id) {
        member_ids = _.filter(member_ids, function (id) {
            return id != member_ids;
        });
    };
};
