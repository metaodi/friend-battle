var global = this;

var FBFriends = function() {
    if (this === global) { return new FBFriends(); }
    var me = this;

    me.getRawFriends = function(callback) {
        FB.api('/me/friends', callback);
    }

    me.getFriends = function(callback) {
        me.getRawFriends(function(response) {
            callback(response.data);
        })
    }

    me.inviteFriends = function() {
        FB.ui({method: 'apprequests',
            title: 'Invite friends',
            message: 'Wanna play friends-battle?'
            // direct request
            //to: friendId
            // suggest friends
            //filters: [{name: 'Suggested', user_ids: ["685145706", "605665581", "596824621"]}]
            // set a target score for the others player
            //data: {"challenge_score" : score };
            //redirect_uri: 'http://friend-battle.lo/response'
        });
    };
}