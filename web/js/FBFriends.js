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

    me.getRandomFriends = function(friendCount, callback) {
        me.getRawFriends(function(response) {
            var randomFriends = [],
                allFriends = response.data,
                i,randomIndex;
            for (i = 0; i < friendCount; i++) {
                randomIndex = getRandomInt(0,allFriends.length-1);
                randomFriends[i] = allFriends[randomIndex];
                allFriends.splice(randomIndex, 1);
            }
            callback(randomFriends);
        })
    }

    var getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
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

    me.processRequests = function() {
        var requestIds = decodeURIComponent((new RegExp('[?|&]' + 'request_ids' + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)
            || [,""])[1].replace(/\+/g, '%20'))
            || null;

        if (requestIds) {
            $.getJSON('/api/request/' + requestIds, function(response) {
                alert(response.message);
            });
        }
    }
}
