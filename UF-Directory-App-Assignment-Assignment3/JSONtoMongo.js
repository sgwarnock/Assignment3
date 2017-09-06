'use strict';
/*
  Import modules/files you may need to correctly run the script.
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Listing = require('./ListingSchema.js'),
    config = require('./config');

/* Connect to your database */
mongoose.connect(config.db.uri);

var listEntries = undefined;
/*
  Instantiate a mongoose model for each listing object in the JSON file,
  and then save it to your Mongo database
 */
 fs.readFile('listings.json', 'utf8', function(err, data) {
   if (err){
     throw err;
   }

      listEntries = JSON.parse(data).entries;
      listEntries.forEach(function(entry) {
         var newEntry = new Listing(entry);
         newEntry.save(function(err) {
           if (err){
             throw err;
           }
           console.log('Entry succesfully created.');
         });
     });
 });

/*
  Once you've written + run the script, check out your MongoLab database to ensure that
  it saved everything correctly.
 */
