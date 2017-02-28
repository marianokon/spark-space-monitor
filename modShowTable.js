


//////////////////////////////////////////////////////////////////////////////
//
//
// modShowTable sub-module: Code for the /showtable modifier
//
// Part of the SparkSpaceMonitor APP
//
///////////////////////

var config = require('./config.js');
var mokDebug = config.mokDebug;


module.exports.app = function(bot, trigger, connection) {

  if ( mokDebug ) console.log('\n\nYa estamos adentro de ShowTable');

  querySQL = "SELECT * FROM SparkSpaceMonitor  ORDER BY roomTitle ";

  if ( mokDebug ) console.log("\n\nSQL Query: " + querySQL);

  var mensajeAlBot = "#Esta es la Tabla: \n\n";
  var count = 1;

  connection.query(querySQL, function (error, results, fields) {
     if (error) throw error;

     if ( results.length > 0 ) {
        results.forEach(function(result) {
          if (mokDebug) console.log(result.personDisplayName);
          mensajeAlBot += count++ + ". " + result.roomTitle + ": " + result.personDisplayName + " (" + result.personEmail + ") ID: " + result.id + "\n";
        })
     };

     if ( mokDebug ) console.log("\n\nMensaje al bot: " + mensajeAlBot);

     bot.dm(trigger.personEmail , { markdown: mensajeAlBot });


  })
};

