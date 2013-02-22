// Load the SDK Asynchronously
(function(d, debug){
    var js;
    var id = 'facebook-jssdk';
    var ref = d.getElementsByTagName('script')[0];
    var locale = d.getElementById('fb_locale');
    if (locale) {
        locale = locale.value;
    } else {
        locale = 'de_CH';
    }
    if (d.getElementById(id)) {return;}
    js = d.createElement('script');
    js.id = id;
    js.async = true;
    js.src = "//connect.facebook.net/" + locale + "/all" + (debug ? "/debug" : "") + ".js";
    ref.parentNode.insertBefore(js, ref);
}(document, /*debug*/ true));
