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

        FBFriends.getFriends(function(friends) {
            var activityList;
            var friendList = $("#content").append('<ul></ul>').find('ul');
            for (var i = 0; i < friends.length; i++) {
                friendList.append("<li>" + friends[i].name);
                activityList = friendList.append("<ul id='activities-" + friends[i].id + "'></ul>").find("#activities-" + friends[i].id);
                friendList.append("</li>");
                printActivities(friends[i].id);
            }
        });
    });

    var printActivities = function(friendId) {
        FBActivities.getLastWeeksActivitiesOfFriend(friendId, function(activities) {
            activityList = $("#activities-" + friendId)
            var message = activities.message || (activities.story + '<br/>' + activities.link);
            activityList.append("<li>" + message  + "</li>");
        });
    }
};