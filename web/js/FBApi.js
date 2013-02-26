var global = this;

// singleton
var FBApi = function() {
    if (this === global) { return new FBApi(); }
    var me = this;

    me.runFqlQuery = function(query, callback) {
        FB.api({
            method: 'fql.query',
            query: query
        }, callback);
    }

    me.getById = function(id, callback) {
        FB.api('/' + id, callback);
    }

    me.convertToUnixTimeStamp = function(dateObj) {
        return Math.round(dateObj.getTime() / 1000);
    }
}