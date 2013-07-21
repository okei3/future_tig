_ = require('underscore');
module.exports =  function (id, name) {
    var memberIds = [];
    this.getId  =  function () {
        return id;
    };
    this.getName = function () {
        return name;
    };
    this.setName = function (newName) {
        name = newName;
    };
    this.hasMember = function (memberId) {
        return _.contains(memberIds, memberId);
    };
    this.addMember = function (memberId) {
        if (!this.hasMember(memberId)) {
            memberIds.push(memberId);
        }
    };
    this.removeMember = function (memberId) {
        memberIds = _.filter(memberIds, function (id) {
            return id != memberIds;
        });
    };
};
