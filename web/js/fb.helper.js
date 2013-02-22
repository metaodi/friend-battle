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
        }, {scope: 'publish_actions,read_stream,friends_activities' } );
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

    me.getRawFriends = function(callback) {
        FB.api('/me/friends', callback);
    }

    me.getFriends = function(callback) {
       me.getRawFriends(function(response) {
           callback(response.data);
       })
    }
}

