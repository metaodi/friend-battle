var global = this;

// singleton
var FBLogin = function(appNamespace) {
    if (this === global) { return new FBLogin(appNamespace); }
    var me = this, processResponse;

    me.loggedInUser;
    processResponse = function(response, callback) {
        var token = response.authResponse['accessToken'];
        $.getJSON('/api/login/' + token, function(response) {
            me.loggedInUser = response;
            FBFriends.processRequests();
            callback(response);
        });
    };

    me.login = function(callback) {
        callback = callback || function(){};
        FB.login(function(response) {
            if (response && response.authResponse) {
                processResponse(response, callback);
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
                processResponse(response, callback);
            } else {
                me.login(callback);
            }
        });
    };

    me.getUser = function() {
        return me.loggedInUser;
    };
}

