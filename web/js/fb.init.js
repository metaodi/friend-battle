window.fbAsyncInit = function() {
    var fbAppId = document.getElementById('fb_app_id').value;
    var fbAppNamespace = document.getElementById('fb_appNamespace').value;

    window.FBHelper = new FBHelper(fbAppNamespace);

    FB.init({
        appId      : fbAppId, // App ID
        status     : true, // check login status
        cookie     : true,
        xfbml      : true  // parse XFBML
    });

    var submitIdea = function() {
        var idea = document.getElementById('fb_submitted_idea');
        console.log(idea);
        if (FBHelper.getUser() && idea && idea.value) {
            FBHelper.postIdea(idea.value, function(response) {
                console.log(response);
            });
        }
    };

    FBHelper.status(function(user) {
        if (!user) {
            return;
        }

        console.log(user);
        var welcome = document.getElementById('welcome-msg');
        welcome.innerHTML = "Welcome to our app, " + user.name;
        $('#navigation').removeClass('hidden');

        FBHelper.processInvites();
        FBHelper.getFriends(function(friends) {
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
        FBHelper.getLastWeeksActivitiesOfFriend(friendId, function(activities) {
            activityList = $("#activities-" + friendId)
            var message = activities.message || (activities.story + '<br/>' + activities.link);
            activityList.append("<li>" + message  + "</li>");
        });
    }
};