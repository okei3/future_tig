module.exports = function() {
    this.edges = [[0, 1], [1, 2], [0, 3], [1, 3]];

    /*
     * @param {Int} nodeId
     */
    this.canMove = function(from, to){
        if (from > to) {
            var tmp = from;
            from = to;
            to = tmp;
        }
        var result = false;
        this.edges.forEach(function(edge){
            if (edge[0] == from && edge[1] == to) {
                result = true;
            }
        });

        return result;
    };
};
