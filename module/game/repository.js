Game = require('./game');
module.exports = function() {

    this.games = {};

    /*
     * @param {Game} game
     */
    this.store = function(game) {
        for (var i in game.players) {
            this.games[game.players[i].id] = game;
        }
    };

    this.resolveByUserId = function(userId) {
        return this.games[userId] || false;
    };

    this.deleteByUserId = function(userId) {
        return this.games[userId] != undefined && delete this.games[userId];
    };

};
