var global = this;

var FBFriendBattle = function(fbAppNamespace) {
    if (this === global) { return new FBFriendBattle(fbAppNamespace); }
    var me = this;

    me.postFightBattle = function(battleUrl, callback) {
        callback = callback || function(){};
        FB.api(
            '/me/' + fbAppNamespace + ':fight',
            'post',
            { battle: battleUrl },
            callback
        );
    };

    me.showBattle = function(contentDiv) {
        console.log("showBattle");
        contentDiv.html('<ul></ul>').children('ul').append('<li>Fetching data...</li>');
        FBActivities.getRandomActivity(function(activity) {
            contentDiv.html('<ul></ul>');
            FBActivities.printActivity(activity, contentDiv.children('ul'));
        });
    }

}