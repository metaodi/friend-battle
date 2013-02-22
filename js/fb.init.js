window.fbAsyncInit = function() {
    var fbAppId = document.getElementById('fb_app_id').value;
    var fbAppNamespace = document.getElementById('fb_appNamespace').value;

    FB.init({
        appId      : fbAppId, // App ID
        status     : true, // check login status
        cookie     : true,
        xfbml      : true  // parse XFBML
    });

    var submitIdea = function() {
        var idea = document.getElementById('fb_submitted_idea');
        console.log(idea);
        console.log(fbAppNamespace);
        if (FBHelper.getUser() && idea && idea.value) {
            FBHelper.postIdea(idea.value, fbAppNamespace, function(response) {
                console.log(response);
            });
        }
    };

    FBHelper.status(function(user) {
        console.log(user);
        var welcome = document.getElementById('welcome-msg');
        welcome.innerHTML = "Welcome to our app, " + user.name;
    });
};