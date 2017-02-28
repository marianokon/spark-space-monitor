

////////////////////////////////////////////////////////////////////////////////////
//
//
// modNotifications sub-module: Code for the personEnters and personExits events
//
// Part of the SparkSpaceMonitor APP
//
///////////////////////


var config = require('./config.js');
var images = require('./images.js');
var mokDebug = config.mokDebug;




/////////////
//
// Person ENTERS a Space...
//
// We send a Welcome message to the Space and a 1:1 Message to Mariano O'Kon
//
//
////


module.exports.personEnters = function(bot, person, connection) {

//flint.on('personEnters', function(bot, person, id) {
  if (mokDebug) {
     console.log('Ingreso una persona a este Space!');
     console.log('\nEsta es la informacion de la persona y el Space:');
     console.log('Room: ' + bot.room.title + '(' + bot.room.id + ')' );
     console.log('Person: ' + person.displayName + '(' + person.emails + ' - ' + person.id + ')' );
  }

  var mensajeAlBot = "";
  var fileAlBot = images.fileAlBotDefault;
  mensajeAlBot = mensajeAlBot + 'Welcome **' + person.displayName + '**!';
  mensajeAlBot += "\n\nThis Space is enhanced by the **Spark Space Monitor bot**";
  mensajeAlBot += "\n\nIf you say **/help** to me I will tell you what I can do.";
  mensajeAlBot += "\n\nIn Spark the easiest way to send me a message is to start writing my name ";
  mensajeAlBot += "and, after the 3rd letter, select my name when Spark offers it (if you just write my name it will **not** work)";
  mensajeAlBot += "\n\nAn alternative is to write **@** and then select my name from the drop-down list that will appear.";

  if (mokDebug) {  console.log('Person avatar: ' + person.avatar) };


  if ( !person.avatar.trim() ) { bot.say( { markdown: mensajeAlBot } )
     } else {
       bot.say( { markdown: mensajeAlBot, file: person.avatar } )
   };

  mensajeAlBot = '¡Acaba de entrar ' + person.displayName + ' (' + person.emails + ') al Space **' + bot.room.title + '**!';

  //////
  //
  // Now we get the list of notifiers from the DB
  //
  // and we send them a message with the NAME and AVATAR of the person that left
  //
  // TO-DO: The AVATAR should be OPTIONAL as it takes too much space
  //

  querySQL = "SELECT * FROM SparkSpaceMonitor WHERE roomId = '" + bot.room.id + "'";

  if ( mokDebug ) console.log("\n\nSQL Query: " + querySQL);

  connection.query(querySQL, function (error, results, fields) {
     if (error) throw error;

     if ( results.length > 0 ) {
        results.forEach(function(result) {
          if (mokDebug) console.log(result.personDisplayName);

          if (result.avatar === "false" || !person.avatar.trim() ) {
            bot.dm(result.personEmail, { markdown: mensajeAlBot });
          } else {
            bot.dm(result.personEmail, { markdown: mensajeAlBot, file: person.avatar  });
          };


        })
     }
  })

};





/////////////
//
// Person EXITS a Space...
//
// We send a Good-bye message to the Space and a 1:1 Message to Mariano O'Kon
//
//
////


module.exports.personExits = function(bot, person, connection) {

//flint.on('personExits', function(bot, person, id) {
  if (mokDebug) {
     console.log('Salio una persona de este Space!: ');
     console.log('\nEsta es la informacion de la persona y el Space:');
     console.log('Room: ' + bot.room.title + '(' + bot.room.id + ')' );
     console.log('Person: ' + person.displayName + '(' + person.emails + ' - ' + person.id + ')' );
  }

  var mensajeAlBot = "";
  var fileAlBot = images.fileAlBotDefault;
  mensajeAlBot = mensajeAlBot + 'Good bye **' + person.displayName + '**!';
  mensajeAlBot = mensajeAlBot + '\n\n You will be missed....';


  if ( !person.avatar.trim() ) { bot.say( { markdown: mensajeAlBot } )
     } else {
       bot.say( { markdown: mensajeAlBot, file: person.avatar } )
   };


  mensajeAlBot = '¡Acaba de salir ' + person.displayName + ' (' + person.emails + ') del Space **' + bot.room.title + '**!';
  if ( mokDebug ) console.log("\n\nMensaje al Bot: " + mensajeAlBot);


  //////
  //
  // Now we will check if the person who left the Space was a notifier
  //
  // If so, we REMOVE it from the DB (we don't want to notify someone who is NOT part of the Space)
  //

  var querySQL = "SELECT COUNT(id) AS count FROM SparkSpaceMonitor WHERE personEmail = '" + person.emails + "' AND roomId = '" + bot.room.id + "'";

  if ( mokDebug ) console.log("\n\nSQL Query: " + querySQL);

  connection.query(querySQL, function (error, results, fields) {
     if (error) throw error;
     if ( mokDebug ) console.log("RESULTS: " + JSON.stringify(results));
     if ( mokDebug ) console.log("Number of Rows = " + results[0].count);

     if ( results[0].count >  0 ) {

        if ( mokDebug ) console.log("Entro por el IF... Existe!");

        querySQL = "DELETE FROM SparkSpaceMonitor WHERE personEmail = '" + person.emails + "' AND roomId = '" + bot.room.id + "'";

        if ( mokDebug ) console.log("\n\nSQL Query: " + querySQL);

        connection.query(querySQL, function (error, results, fields) {
           if (error) throw error;
           console.log("Number of rows: " + results.affectedRows);
           console.log("RESULTS: " + JSON.stringify(results));
         });
     };
  });


  //////
  //
  // Now we get the list of notifiers from the DB
  //
  // and we send them a message with the NAME and AVATAR of the person that left
  //
  // TO-DO: The AVATAR should be OPTIONAL as it takes too much space
  //

  querySQL = "SELECT * FROM SparkSpaceMonitor WHERE roomId = '" + bot.room.id + "'";

  if ( mokDebug ) console.log("\n\nSQL Query: " + querySQL);

  connection.query(querySQL, function (error, results, fields) {
     if (error) throw error;

     if ( results.length > 0 ) {
        results.forEach(function(result) {
          if (mokDebug) console.log(result.personDisplayName);

          if (result.avatar === "false" || !person.avatar.trim() ) {
            bot.dm(result.personEmail, { markdown: mensajeAlBot });
          } else {
            bot.dm(result.personEmail, { markdown: mensajeAlBot, file: person.avatar  });
          };

        })
     }
  })
};




