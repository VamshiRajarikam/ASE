
'use strict';
// Declare app level module which depends on views, and components
var SentimentApp = angular.module("MashApp",[]);


SentimentApp.controller("Sentiment", function ($scope, $http) {
    var i,SentimentText;

    $scope.getReviews = function (sentiText) {

        //This is the Alchemy API for getting the sentiment of the most recent review for a place.
        var con = $http.get("https://en.wikipedia.org/w/api.php?format=json&mozSystem=true&action=query&prop=extracts&exintro=&explaintext=&titles=" + sentiText);
        con.success(function (data) {
            if(data!=null)
            {
                for(i in data.query.pages)
                {
                    SentimentText = data.query.pages[i].extract;
                    console.log(SentimentText);
                }
                $scope.sentiment1 = SentimentText;
            }
        })
        $scope.HideAuthorMoodButton = {'visibility': 'visible'};
        document.getElementById('Senti').style.visibility = 'visible';
    }


    $scope.getSentiment = function (sentiText) {

        console.log("Inside Sentiment Method");
        //This is the Alchemy API for getting the sentiment of the most recent review for a place.
        var callback = $http.get("http://gateway-a.watsonplatform.net/calls/text/TextGetTextSentiment" +
            "?apikey=5f3b5ccd34a8fbb9203b943ce4f5f8728ae124cd" +
            "&outputMode=json&text=" + sentiText);
        callback.success(function (data) {
            if(data!=null)
            {
                if(data!=null && data.docSentiment!=null)
                {
                    var mood = data.docSentiment.type;
                    $scope.sentiment = "The autor is in " + data.docSentiment.type + " mood";

                }
            }
        })
    }

});