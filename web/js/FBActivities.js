var global = this;

var FBActivities = function() {
    if (this === global) { return new FBActivities(); }
    var me = this;

    me.loadActivityStream = function(contentDiv) {
        var container = contentDiv.html('<ul></ul>').children('ul');
        container.append('<li>Fetching data...</li>');

        $.getJSON('/api/activitystream', function(response) {
            container.html('');
            var i, content, message;
            for(i=0; i<response.data.length; i++) {
                content = response.data[i];
                //console.log(content);
                message = content.message || (content.story + '<br/>' + content.link);
                container.append('<li><b>' + content.from.name + ':</b><br/>' + message + '</li>')
            }
        });
    }

    me.getLastWeeksActivitiesOfFriend = function(friendId, callback) {
        var oneWeekAgo  = FBApi.convertToUnixTimeStamp(new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000));
        var twoWeeksAgo = FBApi.convertToUnixTimeStamp(new Date(new Date().getTime() - 14 * 24 * 60 * 60 * 1000));
        var query = "select post_id, actor_id, target_id, message " +
            "from stream " +
            "where source_id = " + friendId +
            " and created_time < "  + oneWeekAgo +
            " and created_time > "  + twoWeeksAgo +
            "LIMIT 10";
        FBApi.runFqlQuery(query, function(queryResult) {
            if(queryResult.error_msg) {
                console.error(queryResult.error_msg);
                return;
            }
            for (var i = 0; i < queryResult.length; i++) {
                FBApi.getById(queryResult[i].post_id, callback);
            }
        });
    }

    me.getLastWeeksActivities = function(contentDiv) {
        var friendList = contentDiv.html('<ul></ul>').children('ul');
        friendList.append('<li>Fetching data...</li>');
        FBFriends.getRandomFriends(5,function(friends) {
            friendList.html('');
            var activityList;
            for (var i = 0; i < friends.length; i++) {
                friendList.append("<li>" + friends[i].name);
                activityList = friendList.append("<ul id='activities-" + friends[i].id + "'></ul>").find("#activities-" + friends[i].id);
                friendList.append("</li>");
                printFriendActivities(friends[i].id);
            }
        });
    }

    var printFriendActivities = function(friendId) {
        var activityList = $("#activities-" + friendId);
        activityList.append('<li>Fetching data...</li>');
        me.getLastWeeksActivitiesOfFriend(friendId, function(activities) {
            activityList.html('');
            var message = activities.message || (activities.story + '<br/>' + activities.link);
            activityList.append("<li>" + message  + "</li>");
        });
    }
}