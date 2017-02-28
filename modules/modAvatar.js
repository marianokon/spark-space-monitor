


//////////////////////////////////////////////////////////////////////////////
//
//
// modAvatar sub-module: Code for the /avatar and /noavatar modifiers
//
// Part of the SparkSpaceMonitor APP
//
///////////////////////


var config = require('./config.js');
var mokDebug = config.mokDebug;



/////////////
//
// Show me the AVATAR of the user when sending me 1:1 messages
//
////


module.exports.avatar = function(bot, trigger, connection) {


//flint.hears('/avatar', function(bot, trigger) {

  if (mokDebug) console.log(trigger.roomId);

  var mensajeAlBot = "";
  var querySQL = "";

  querySQL = "SELECT COUNT(id) AS count FROM SparkSpaceMonitor WHERE personId = '" + trigger.personId + "'";

  if ( mokDebug ) console.log("\n\nSQL Query: " + querySQL);

  connection.query(querySQL, function (error, results, fields) {
     if (error) throw error;

     if ( mokDebug ) {
       console.log("Number of hits: " + results[0].count);
       console.log("RESULTS: " + JSON.stringify(results));
     };

     if ( results[0].count > 0 ) {

        if ( mokDebug ) console.log("Entro por el IF... Existe!");


        querySQL = "UPDATE SparkSpaceMonitor SET avatar = 'true' WHERE personId = '" + trigger.personId + "'";

        if ( mokDebug ) console.log("\n\nSQL Query: " + querySQL);


       connection.query(querySQL, function (error, results, fields) {
           if (error) throw error;
           console.log("Number of rows: " + results.affectedRows);
           console.log("RESULTS: " + JSON.stringify(results));

           mensajeAlBot = "Congratulations " + trigger.personDisplayName +"!";
           mensajeAlBot += "\n\nFrom now onwards you will see the person's avatar when you get notified with a 1:1 Message from me (**Spark Space Monitor bot**)";
           mensajeAlBot += "\n\nShould you decide that you want to opt out of this functionality";
           mensajeAlBot += " you only need to call me with the** /noavatar** modifier";

           bot.say({ markdown: mensajeAlBot });

         });

  } else {
       if ( mokDebug ) console.log("Entro por el ELSE... NO Existe!");

       mensajeAlBot = "Mmmm, not sure if you were aware of this...";
       mensajeAlBot += "\n\n But you were **not subscribed** to be notified for any Space!"
       mensajeAlBot += "\n\n You need to be registered in our system for at least on one Space to modify your **avatar** settings!"

       bot.say({ markdown: mensajeAlBot });

  };

 });

};







/////////////
//
// DO NOT show me the AVATAR of the user when sending me 1:1 messages
//
////


module.exports.noavatar = function(bot, trigger, connection) {

// flint.hears('/noavatar', function(bot, trigger) {

  if (mokDebug) console.log(trigger.roomId);

  var mensajeAlBot = "";
  var querySQL = "";

  querySQL = "SELECT COUNT(id) AS count FROM SparkSpaceMonitor WHERE personId = '" + trigger.personId + "'";

  if ( mokDebug ) console.log("\n\nSQL Query: " + querySQL);

  connection.query(querySQL, function (error, results, fields) {
     if (error) throw error;

     if ( mokDebug ) {
       console.log("Number of hits: " + results[0].count);
       console.log("RESULTS: " + JSON.stringify(results));
     };

     if ( results[0].count > 0 ) {

        if ( mokDebug ) console.log("Entro por el IF... Existe!");

        querySQL = "UPDATE SparkSpaceMonitor SET avatar = 'false' WHERE personId = '" + trigger.personId + "'";

        if ( mokDebug ) console.log("\n\nSQL Query: " + querySQL);


       connection.query(querySQL, function (error, results, fields) {
           if (error) throw error;
           console.log("Number of rows: " + results.affectedRows);
           console.log("RESULTS: " + JSON.stringify(results));

           mensajeAlBot = "Congratulations " + trigger.personDisplayName +"!";
           mensajeAlBot += "\n\nFrom now onwards you will not see the person's avatar when you get notified with a 1:1 Message from me (**Spark Space Monitor bot**)";
           mensajeAlBot += "\n\nShould you decide that you want to opt in of this functionality";
           mensajeAlBot += " you only need to call me with the** /avatar** modifier";

           bot.say({ markdown: mensajeAlBot });

         });

  } else {
       if ( mokDebug ) console.log("Entro por el ELSE... NO Existe!");

       mensajeAlBot = "Mmmm, not sure if you were aware of this...";
       mensajeAlBot += "\n\n But you were **not subscribed** to be notified for any Space!"
       mensajeAlBot += "\n\n You need to be registered in our system for at least on one Space to modify your **avatar** settings!"

       bot.say({ markdown: mensajeAlBot });

  };

 });

};


