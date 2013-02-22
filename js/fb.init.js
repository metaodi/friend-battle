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
        console.log(user);
        var welcome = document.getElementById('welcome-msg');
        welcome.innerHTML = "Welcome to our app, " + user.name;
        $('#navigation').removeClass('hidden');

        FBHelper.getFriends(function(res) {
            console.log("getFriends", res);
            var friends = res.data;
            for (var i = 0; i < friends.length; i++) {
                document.write(friends[i].name + "<br>");
            }
        });
        FBHelper.getFriends(function(res) {

            var friends = res.data;
            var list = $("#content").append('<ul></ul>').find('ul');
            for (var i = 0; i < friends.length; i++) {
                list.append("<li>" + friends[i].name + "</li>");
            }
        });
    });
};