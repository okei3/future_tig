_ = require('underscore');

/**
 * @param {Array} playersIds
 * @param {Map} map
 */
module.exports = function(playersIds, map) {
    this.players = [];
    this.turn = 0;
    this.map = map;

    var Player = require('./player');
    playersIds.forEach(function(id){
        playersIds.push(new Player(id));
    });

    this.changeTurn = function(){
        this.turn++;
    };
};
