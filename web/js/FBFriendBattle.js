var global = this;

var FBFriendBattle = function(fbAppNamespace) {
    if (this === global) { return new FBFriendBattle(fbAppNamespace); }
    var me = this;

    me.fightBattle = function(battleUrl, callback) {
        callback = callback || function(){};
        FB.api(
            '/me/' + fbAppNamespace + ':fight',
            'post',
            { battle: battleUrl },
            callback
        );
    };


}