var global = this;

// singleton
var FBHelper = new function() {
    //if (this === global) { return new FBLogin(); }
    var me = this;

    me.loggedInUser;

    me.login = function(callback) {
        callback = callback || function(){};
        FB.login(function(response) {
            if (response.authResponse) {
                FB.api('/me', function(response) {
                    me.loggedInUser = response;
                    callback(response);
                });
            } else {
                me.loggedInUser = null;
                callback(null);
            }
        }, {scope: 'publish_actions' } );
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

    me.postIdea = function(ideaUrl, appNamespace, callback) {
        callback = callback || function(){};
        FB.api(
            '/me/' + appNamespace + ':add',
            'post',
            { idea: ideaUrl },
            function(response) {
                callback(response);
            });
    };
}

