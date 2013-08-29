/**
 * @param playersId
 */
module.exports = function(playersId) {
    this.id = playersId;
    this.position = 0;

    /*
     * @param {Int} nodeId
     */
    this.move = function(nodeId, map){
        if (map.canMove(this.position, nodeId)) {
            this.position = nodeId;
            return true;
        }
        return false;
    };
};
