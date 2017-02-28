

////////////////////////////////////////////////////////////////////////////////////
//
//
// modNotifiers sub-module: Code for the /addme, /removeme and /showme modifiers
//
// Part of the SparkSpaceMonitor APP
//
///////////////////////


var config = require('./config.js');
var mokDebug = config.mokDebug;




/////////////
//
// AddMe to the list of people that receives notifications
//
// when someone ENTERS or EXITS a Space being monitored by
//
// Space Monitor BOT
//
////

module.exports.addme = function(bot, trigger, connection) {

//flint.hears('/addme', function(bot, trigger) {

  if (mokDebug) console.log(trigger.roomId);

  var mensajeAlBot = "";
  var querySQL = "";

  querySQL = "SELECT COUNT(id) AS count FROM SparkSpaceMonitor WHERE personId = '" + trigger.personId + "' AND roomId = '" + trigger.roomId + "'";

  if ( mokDebug ) console.log("\n\nSQL Query: " + querySQL);

  connection.query(querySQL, function (error, results, fields) {
     if (error) throw error;

     if ( mokDebug ) {
       console.log("Number of hits: " + results[0].count);
       console.log("RESULTS: " + JSON.stringify(results));
     };



     if ( results[0].count ==  0 ) {

        if ( mokDebug ) console.log("Entro por el IF... NO Existe!");

        var dateAdded = new Date().toISOString();

        querySQL = "INSERT INTO SparkSpaceMonitor (personEmail, personId, personDisplayName, roomId, roomTitle, avatar, creation_date, modification_date ) VALUES ("
        querySQL += "'" + trigger.personEmail + "', ";
        querySQL += "'" + trigger.personId + "', ";
        querySQL += "\"" + trigger.personDisplayName + "\", ";
        querySQL += "'" + trigger.roomId + "', ";
        querySQL += "'" + trigger.roomTitle + "', ";
        querySQL += "'true', ";
        querySQL += "'" + dateAdded + "', ";
        querySQL += "'" + dateAdded + "')";

        if ( mokDebug ) console.log("\n\nSQL Query: " + querySQL);

        connection.query(querySQL, function (error, results, fields) {
           if (error) throw error;

           if (mokDebug) {
           console.log("Number of rows: " + results.affectedRows);
           console.log("RESULTS: " + JSON.stringify(results));
           };

           mensajeAlBot = "Congratulations " + trigger.personDisplayName +"!";
           mensajeAlBot += "\n\nFrom now onwards you will be notified with a 1:1 Message from me (**Spark Space Monitor bot**)";
           mensajeAlBot += " every time a user **enters** or **exits** this Space";
           mensajeAlBot += "\n\nShould you decide that you want to opt out of this functionality";
           mensajeAlBot += " you only need to call me with the** /removeme** modifier";

           bot.say({ markdown: mensajeAlBot });

         });

  } else {
       if ( mokDebug ) console.log("Entro por el ELSE... Ya Existe!");

       mensajeAlBot = "Mmmm, not sure if you were aware of this...";
       mensajeAlBot += "\n\n But you were **already subscribed** to be notified for this room!"

       bot.say({ markdown: mensajeAlBot });

  };

 });

};





/////////////
//
// RemoveMe from the list of people that receives notifications
//
// when someone ENTERS or EXITS a Space being monitored by
//
// Space Monitor BOT
//
////

module.exports.removeme = function(bot, trigger, connection) {

//flint.hears('/removeme', function(bot, trigger) {

  if (mokDebug) console.log(trigger.roomId);

  var mensajeAlBot = "";
  var querySQL = "";

  querySQL = "SELECT COUNT(id) AS count FROM SparkSpaceMonitor WHERE personId = '" + trigger.personId + "' AND roomId = '" + trigger.roomId + "'";

  if ( mokDebug ) console.log("\n\nSQL Query: " + querySQL);

  connection.query(querySQL, function (error, results, fields) {
     if (error) throw error;

     if ( mokDebug ) {
       console.log("Number of hits: " + results[0].count);
       console.log("RESULTS: " + JSON.stringify(results));
     };


     if ( results[0].count >  0 ) {

        if ( mokDebug ) console.log("Entro por el IF... Existe!");

        querySQL = "DELETE FROM SparkSpaceMonitor WHERE personEmail = '" + trigger.personEmail + "' AND roomId = '" + trigger.roomId + "'";

        if ( mokDebug ) console.log("\n\nSQL Query: " + querySQL);

        connection.query(querySQL, function (error, results, fields) {
           if (error) throw error;

           if (mokDebug) {
           console.log("Number of rows: " + results.affectedRows);
           console.log("RESULTS: " + JSON.stringify(results));
           };

           mensajeAlBot = "Congratulations " + trigger.personDisplayName +"!";
           mensajeAlBot += "\n\nYou have been removed from the list of people being notified";
           mensajeAlBot += " every time a user **enters** or **exits** this Space";
           mensajeAlBot += "\n\nShould you decide that you want to opt in again of this functionality";
           mensajeAlBot += " you only need to call me with the** /addme** modifier";

           bot.say({ markdown: mensajeAlBot });

         });

  } else {
       if ( mokDebug ) console.log("Entro por el ELSE... Ya Existe!");

       mensajeAlBot = "Mmmm, not sure if you were aware of this...";
       mensajeAlBot += "\n\n But you were **not subscribed** to be notified for this room!"

       bot.say({ markdown: mensajeAlBot });

  };

 });

};






/////////////
//
// ShowMe the list of people that receives notifications
//
// when someone ENTERS or EXITS a Space being monitored by
//
// Space Monitor BOT
//
////


module.exports.showme = function(bot, trigger, connection) {

//flint.hears('/showme', function(bot, trigger) {

  if (mokDebug) console.log(trigger.roomId);

  var querySQL = "";
  var mensajeAlBot = "These are the people being notified:\n\n ";
  var count = 1;


  querySQL = "SELECT * FROM SparkSpaceMonitor WHERE roomId = '" + trigger.roomId + "'";

  if ( mokDebug ) console.log("\n\nSQL Query: " + querySQL);

  connection.query(querySQL, function (error, results, fields) {
     if (error) throw error;

     if ( mokDebug )  {
       console.log("Number of rows: " + results.affectedRows);
       console.log("RESULTS: " + JSON.stringify(results));
       console.log("Results Length: " + results.length);
     };

     if ( results.length > 0 ) {
        results.forEach(function(result) {
           if (mokDebug) console.log(result.personDisplayName);
           mensajeAlBot += count++ + ". " + result.personDisplayName + " (" + result.personEmail + ")\n\n";
        })

       bot.say({ markdown: mensajeAlBot });

     } else {

       mensajeAlBot = "Nobody is being notified in this Space! ";
       mensajeAlBot += "\n\n What's going on?! I need to work!  :-)"

       bot.say({ markdown: mensajeAlBot });
  };

 });

};

