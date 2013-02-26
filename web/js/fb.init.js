window.fbAsyncInit = function() {
    var fbAppId = document.getElementById('fb_app_id').value;
    var fbAppNamespace = document.getElementById('fb_appNamespace').value;

    window.FBActivities = new FBActivities();
    window.FBApi = new FBApi();
    window.FBFriends = new FBFriends();
    window.FBLogin = new FBLogin(fbAppNamespace);

    FB.init({
        appId      : fbAppId, // App ID
        status     : true, // check login status
        cookie     : true,
        xfbml      : true  // parse XFBML
    });

    FBLogin.status(function(user) {
        if (!user) {
            return;
        }
        console.log("Logged in user", user);
        var welcome = document.getElementById('welcome-msg');
        welcome.innerHTML = "Welcome to our app, " + user.name;
        $('#navigation').removeClass('hidden');

        //load activitiy stream at the beginning
        FBActivities.loadActivityStream($('#content'));
    });
};