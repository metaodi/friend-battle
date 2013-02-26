window.FBHelper.prototype.inviteFriends = function() {
    FB.ui({method: 'apprequests',
        title: 'Invite friends',
        message: 'Wanna play friends-battle?'
        // direct request
        //to: friendId
        // suggest friends
        //filters: [{name: 'Suggested', user_ids: ["685145706", "605665581", "596824621"]}]
        // set a target score for the others player
        //data: {"challenge_score" : score };
        //redirect_uri: 'http://friend-battle.lo/response'
    });
};
