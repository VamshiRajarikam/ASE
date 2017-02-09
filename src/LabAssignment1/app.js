/**
 * Created by vamshirajarikam on 2/8/17.
 */
'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [])


    .controller('View1Ctrl', function ($scope, $http) {
        $scope.venueList = new Array();
        $scope.mostRecentReview;
        $scope.getVenues = function () {
            var auth = {
                consumerKey: "DEBR4B5LwlUOwbBBWzYo1A",
                consumerSecret: "ywEvrYAPB1kZmcCGwrnK8C3meug",
                accessToken: "R9IBDmHzTDZLBSeI6tdPiHc88V4KLaWT",
                accessTokenSecret: "Rk4pszeni5CTnfVqlQY-Fze8qWg",
            };

            var terms = 'food';
            var near = 'San+Francisco';

            var accessor = {
                consumerSecret: auth.consumerSecret,
                tokenSecret: auth.accessTokenSecret
            };

            var parameters = [];
            parameters.push(['term', terms]);
            parameters.push(['location', near]);
            parameters.push(['oauth_consumer_key', auth.consumerKey]);
            parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
            parameters.push(['oauth_token', auth.accessToken]);

            var message = {
                'action': 'http://api.yelp.com/v2/search',
                'method': 'GET',
                'parameters': parameters
            };

            OAuth.setTimestampAndNonce(message);

            OAuth.SignatureMethod.sign(message, accessor);

            var parameterMap = OAuth.getParameterMap(message.parameters);
            parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature)

            var url = OAuth.addToURL(message.action, parameterMap);
            var response = UrlFetchApp.fetch(url).getContentText();
            var responseObject = Utilities.jsonParse(response);
        }}//have my JSON object, do whatever we want here, like add to spreadsheets