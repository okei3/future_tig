_ = require('underscore');

/**
 * @param {Array} playersIds
 * @param {Map} map
 */
module.exports = function(playersIds, map) {
    var self = this;

    this.players = [];
    this.turn = 0;
    this.map = map;

    var Player = require('./player');
    playersIds.forEach(function(id){
        self.players.push(new Player(id));
    });

    this.changeTurn = function(){
        this.turn = (this.turn >= this.players.length - 1) ? 0 : this.turn + 1 ;
    };
};
