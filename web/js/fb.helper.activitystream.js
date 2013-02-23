window.FBHelper.prototype.loadActivityStream = function() {

    var container = $('#content').html('<ul></ul>').children('ul');
    container.append('<li>Fetching data...</li>');

    $.getJSON('/api/activitystream', function(response) {
    //FB.api('/me/home', function(response) {
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
