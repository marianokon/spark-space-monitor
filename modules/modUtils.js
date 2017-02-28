

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//
// modUtils sub-module: Code for the different features (some hidden):
//                      1. Ayuda       - Send the HELP information in Spanish
//                      2. Help        - Send the HELP information in English
//                      3. Hello       - Send the HELLO greeting
//                      4. Hola        - Send the HELLO greeting in Spanish
//                      5. Photo       - Send a Photo (testing purposes)
//                      6. Boca        - Hidden modifier to test the app
//                      7. Show Tables - Hidden modifier to send the TABLE as a 1:1 Message
//
// Part of the SparkSpaceMonitor APP
//
///////////////////////

var config = require('./../config.js');
var images = require('./../images.js');
var mokDebug = config.mokDebug;




///////////////////////////////////////////////
//
// Show Ayuda (say ayuda)
//


module.exports.ayuda = function(bot, trigger) {

//flint.hears('/ayuda', function(bot, trigger) {

  var mensajeAlBot = 'Hola ' + trigger.personDisplayName + '!';
  mensajeAlBot += '\n\nMi nombre es **Space Monitor** y soy un ro**BOT** que agrega funcionalidades a **Cisco Spark**\n\n ';
  mensajeAlBot += '\n\nPuedes usar los siguientes **modificadores**:';
  mensajeAlBot += '\n\n1. /members';
  mensajeAlBot += '\n\n2. /hello or /hola';
  mensajeAlBot += '\n\n3. /help  or /ayuda';
  mensajeAlBot += '\n\n4. /foto';
  mensajeAlBot += '\n\nEsta funcion no esta del todo implementada aun... mil disculpas... (Busquen a Mariano O\'Kon y diganle que se ponga a trabajar...)';
  mensajeAlBot += '\n\n**ENJOY!**';

  bot.say({
    markdown: mensajeAlBot,
    files: [images.botLogo]
  });
};






///////////////////////////////////////////////
//
// Show Help (say help)
//

module.exports.help = function(bot, trigger) {

//flint.hears('/help', function(bot, trigger) {

  var mensajeAlBot = 'Hello ' + trigger.personDisplayName + '!';
  mensajeAlBot += '\n\nMy name is **Space Monitor** and I am a ro**BOT** that augments **Cisco Spark**s functionality\n\n';
  mensajeAlBot += '\n\nMy main purpose in life is to **Monitor** who ENTERS and EXITS from designated Spaces';
  mensajeAlBot += '\n\nUpon any of these actions I will do 2 things:';
  mensajeAlBot += '\n\n 1. I will inform the Space that someone ENTERED or EXITED the Space';
  mensajeAlBot += '\n\n 2. I will send a 1:1 message to any person that requested to be notified';
  mensajeAlBot += '\n\nYou can use this bot in multiple Spaces (just add me!) and multiple people can request to be notified';
  mensajeAlBot += '\n\nYou communicate with me by, within the Space, include my name and any of the following modifers:' ;
  mensajeAlBot += '\n\n1. **/addme**    - ADDs your name to the list of people notified';
  mensajeAlBot += '\n\n2. **/removeme** - REMOVEs your name from the list of people notified';
  mensajeAlBot += '\n\n3. **/showme**   - SHOWs you the list of people that will be notified';
  mensajeAlBot += '\n\n4. **/avatar**   - Includes the avatar of the person when you get notified ';
  mensajeAlBot += '\n\n5. **/noavatar** - Does NOT Include the avatar of the person when you get notified';
  mensajeAlBot += '\n\n6. **/members**  - Shows who is in this Space (with no bots, only people)' ;
  mensajeAlBot += '\n\n7. **/hello**    - Will greet you with a simple message';
  mensajeAlBot += '\n\n8. **/help**     - Shows you this help screen';

  mensajeAlBot += '\n\n**ENJOY!**';

  bot.say({
    markdown: mensajeAlBot,
    files: [images.botLogo]
  });

};








///////////////////////////////////////////////
//
// Show Hello (say hello)
//

module.exports.hello = function(bot, trigger) {

//flint.hears('/hello', function(bot, trigger) {
  bot.say({
    markdown: 'Hello ' + trigger.personDisplayName + '!\n\nMy name is **Space Monitor** and I am a ro**BOT** that augments **Cisco Spark**s functionality \n\n Use the **/help** modifier to see what I can do for you!  **ENJOY!**',
    files: ['http://blog.marianokon.com/wp-content/uploads/2017/02/SparkMonitor-bot.jpg']
  });

};





///////////////////////////////////////////////
//
// Show Hola (say hola)
//

module.exports.hola = function(bot, trigger) {

//flint.hears('/hola', function(bot, trigger) {
  bot.say({
    markdown: 'Hola ' + trigger.personDisplayName + '!\n\nMi nombre es **Space Monitor** y soy un ro**BOT** que agrega funcionalidades a **Cisco Spark**\n\n Use el modificador /ayuda para ver que puedo hacer por usted!  **ENJOY!**',
    files: ['http://blog.marianokon.com/wp-content/uploads/2017/02/SparkMonitor-bot.jpg']
  });

};



///////////////////////////////////////////////
//
// Show Photo (say foto)
//

module.exports.foto = function(bot, trigger) {

//flint.hears('/foto', function(bot, trigger) {
  bot.say({
    markdown: 'Prueba de mensaje desde MarianOKon.io! \n\n **ENJOY!**',
    files: ['http://blog.marianokon.com/wp-content/uploads/2017/02/SparkMonitor-bot.jpg']
  });
};





///////////////////////////////////////////////
//
// Boca (say boca)
//

module.exports.boca = function(bot, trigger) {

  console.log('\n\nYa estamos adentro de Boca');

  bot.say({
    markdown: 'Hola ' + trigger.personDisplayName + '!\n\nSolo para que sepas que **Boca Juniors** es el UNICO GRANDE de la Argentina que NUNCA SE FUE A LA B!',
    files: ['http://k30.kn3.net/taringa/F/0/A/1/E/4/MisticaSB/658.jpg']
  });
};






///////////////////////////////////////////////
//
// Show Table (say showtable)
//


module.exports.showtable = function(bot, trigger, connection) {

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




