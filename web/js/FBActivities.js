var global = this;

var FBActivities = function() {
    if (this === global) { return new FBActivities(); }
    var me = this;

    me.loadActivityStream = function() {

        var container = $('#content').html('<ul></ul>').children('ul');
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
}