/**
 * Created by mnpw3d on 20/10/2016.
 */
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url ='mongodb://Vamshi:9848663776@ds139370.mlab.com:39370/asedatabase';
//var url = 'mongodb://marmik:2621@ds051923.mlab.com:51923/demo';
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
  db.close();
});