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
        var activityList = contentDiv.html('<ul></ul>').children('ul');
        FBActivities.getRandomActivity(function(activity) {
            console.log("got random activity", activity)
            FBActivities.printActivity(activity, activityList);
        });
    }

}