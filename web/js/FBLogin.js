var global = this;

// singleton
var FBLogin = function(appNamespace) {
    if (this === global) { return new FBLogin(appNamespace); }
    var me = this;

    me.loggedInUser;

    me.login = function(callback) {
        callback = callback || function(){};
        FB.login(function(response) {
            if (response && response.authResponse) {
                var token = response.authResponse['accessToken'];
                //FB.api('/me', function(response) {
                $.getJSON('/api/login/' + token, function(response) {
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
}

