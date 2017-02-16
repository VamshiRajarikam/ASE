/**
 * Created by vamshirajarikam on 2/8/17.
 */
function statusChangeCallback(response) {
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
        // Logged into your app and Facebook.
        testAPI();
    } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
        console.log("The person is logged into Facebook, but not your app.");
    } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
    }
}
// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
});
}
window.fbAsyncInit = function()
{
    FB.init({
        appId: '395039187517503',
        cookie: true, // enable cookies to allow the server to access // the session
        xfbml: true, // parse social plugins on this page
        version: 'v2.8' // use version 2.2
    });
    FB.Event.subscribe('auth.login', function () {
        window.location = "http://localhost:63342/ReviewSentiment/app/index.html?_ijt=2nk3nd319mkehn8p845r858vu2";
    });

    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
};
// Load the SDK asynchronously
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI()
{
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
        console.log("Fb response");
        console.log(response);
        console.log('Successful login for: ' + response.name);
        document.getElementById('status').innerHTML ='Thanks for logging in, ' + response.name + '!';
    });
}


//authentication using yelp.com
function cb(data) {
    console.log("cb: " + JSON.stringify(data));
}

var auth = {
    //
    // Update with your auth tokens.
    //
    consumerKey : "DEBR4B5LwlUOwbBBWzYo1A",
    consumerSecret : "ywEvrYAPB1kZmcCGwrnK8C3meug",
    accessToken : "R9IBDmHzTDZLBSeI6tdPiHc88V4KLaWT",
    // This example is a proof of concept, for how to use the Yelp v2 API with javascript.
    // You wouldn't actually want to expose your access token secret like this in a real application.
    accessTokenSecret : "Rk4pszeni5CTnfVqlQY-Fze8qWg",
    serviceProvider : {
        signatureMethod : "HMAC-SHA1"
    }
};

var terms = 'food';
var near = 'San+Francisco';

var accessor = {
    consumerSecret : auth.consumerSecret,
    tokenSecret : auth.accessTokenSecret
};

var parameters = [];
parameters.push(['term', terms]);
parameters.push(['location', near]);
parameters.push(['callback', 'cb']);
parameters.push(['oauth_consumer_key', auth.consumerKey]);
parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
parameters.push(['oauth_token', auth.accessToken]);
parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

var message = {
    'action' : 'https://api.yelp.com/v2/search',
    'method' : 'GET',
    'parameters' : parameters
};

OAuth.setTimestampAndNonce(message);
OAuth.SignatureMethod.sign(message, accessor);

var parameterMap = OAuth.getParameterMap(message.parameters);

$.ajax({
    'url' : message.action,
    'data' : parameterMap,
    'dataType' : 'jsonp',
    'jsonpCallback' : 'cb',
    'cache': true
})
    .done(function(data, textStatus, jqXHR) {
            console.log('success[' + data + '], status[' + textStatus + '], jqXHR[' + JSON.stringify(jqXHR) + ']');
        }
    )
    .fail(function(jqXHR, textStatus, errorThrown) {
            console.log('error[' + errorThrown + '], status[' + textStatus + '], jqXHR[' + JSON.stringify(jqXHR) + ']');
        }
    );
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}