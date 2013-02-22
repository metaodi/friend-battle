var global = this;

// singleton
var FBHelper = function(appNamespace) {
    if (this === global) { return new FBLogin(); }
    var me = this;

    me.loggedInUser;

    me.login = function(callback) {
        callback = callback || function(){};
        FB.login(function(response) {
            if (response && response.authResponse) {
                FB.api('/me', function(response) {
                    me.loggedInUser = response;
                    callback(response);
                });
            } else {
                me.loggedInUser = null;
                callback(null);
            }
        }, {scope: 'publish_actions,read_stream,friends_activities,user_activities' } );
    };

    me.status = function(callback) {
        callback = callback || function(){};
        FB.getLoginStatus(function(response) {
            if(response && response.status == 'connected') {
                FB.api('/me', function(response) {
                    me.loggedInUser = response;
                    callback(response);
                });
            } else {
                me.login(callback);
            }
        });
    };


    me.getUser = function() {
        return me.loggedInUser;
    };

    me.postIdea = function(ideaUrl, callback) {
        callback = callback || function(){};
        FB.api(
            '/me/' + appNamespace + ':add',
            'post',
            { idea: ideaUrl },
            callback
        );
    };

    me.runFqlQuery = function(query, callback) {
        FB.api({
            method: 'fql.query',
            query: query
        }, callback);
    }

    me.getRawFriends = function(callback) {
        FB.api('/me/friends', callback);
    }

    me.getFriends = function(callback) {
       me.getRawFriends(function(response) {
           callback(response.data);
       })
    }

    me.getById = function(id, callback) {
        FB.api('/' + id, callback);
    }

    me.getLastWeeksActivitiesOfFriend = function(friendId, callback) {
        var oneWeekAgo  = convertToUnixTimeStamp(new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000));
        var twoWeeksAgo = convertToUnixTimeStamp(new Date(new Date().getTime() - 14 * 24 * 60 * 60 * 1000));
        var query = "select post_id, actor_id, target_id, message " +
                    "from stream " +
                    "where source_id = " + friendId +
                    " and created_time < "  + oneWeekAgo +
                    " and created_time > "  + twoWeeksAgo +
                    "LIMIT 10";
        me.runFqlQuery(query, callback);
    }

    var convertToUnixTimeStamp = function(dateObj) {
        return Math.round(dateObj.getTime() / 1000);
    }


    me.printer = function(res) {
        console.log(res);
    }
}

