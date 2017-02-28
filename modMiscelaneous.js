


//////////////////////////////////////////////////////////////////////////////
//
//
// modMiscalenous sub-module: Code for the /ayuda and /help modifiers
//
// Part of the SparkSpaceMonitor APP
//
///////////////////////


var config = require('./config.js');
var images = require('./images.js');
var mokDebug = config.mokDebug;




// say ayuda

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






// say help
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
  mensajeAlBot += '\n\n 1.** /addme**    - ADDs your name to the list of people notified';
  mensajeAlBot += '\n\n 2.** /removeme** - REMOVEs your name from the list of people notified';
  mensajeAlBot += '\n\n 3.** /showme**   - SHOWs you the list of people that will be notified';
  mensajeAlBot += '\n\n 4.** /members**  - Shows who is in this Space (with no bots, only people)' ;
  mensajeAlBot += '\n\n 5.** /hello**    - Will greet you with a simple message';
  mensajeAlBot += '\n\n 6.** /help**     - Shows you this help screen';

  mensajeAlBot += '\n\n**ENJOY!**';

  bot.say({
    markdown: mensajeAlBot,
    files: [images.botLogo]
  });

};








// say hello
module.exports.hello = function(bot, trigger) {

//flint.hears('/hello', function(bot, trigger) {
  bot.say({
    markdown: 'Hello ' + trigger.personDisplayName + '!\n\nMy name is **Space Monitor** and I am a ro**BOT** that augments **Cisco Spark**s functionality \n\n Use the **/help** modifier to see what I can do for you!  **ENJOY!**',
    files: ['http://blog.marianokon.com/wp-content/uploads/2017/02/SparkMonitor-bot.jpg']
  });

};





// say hola
module.exports.hola = function(bot, trigger) {

//flint.hears('/hola', function(bot, trigger) {
  bot.say({
    markdown: 'Hola ' + trigger.personDisplayName + '!\n\nMi nombre es **Space Monitor** y soy un ro**BOT** que agrega funcionalidades a **Cisco Spark**\n\n Use el modificador /ayuda para ver que puedo hacer por usted!  **ENJOY!**',
    files: ['http://blog.marianokon.com/wp-content/uploads/2017/02/SparkMonitor-bot.jpg']
  });

};



// say foto
module.exports.foto = function(bot, trigger) {

//flint.hears('/foto', function(bot, trigger) {
  bot.say({
    markdown: 'Prueba de mensaje desde MarianOKon.io! \n\n **ENJOY!**',
    files: ['http://blog.marianokon.com/wp-content/uploads/2017/02/SparkMonitor-bot.jpg']
  });
};

