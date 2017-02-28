var Flint = require('node-flint');
var webhook = require('node-flint/webhook');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var request = require('request');
var parseString = require('xml2js').parseString;
var et = require('elementtree');
//var _ = require('lodash');

var images = require('./images.js');
var config = require('./config.js');


var modAvatar        = require("./modAvatar");        // Module with features to toggle the view of the AVATAR in 1:1 messages
var modNotifiers     = require("./modNotifiers");     // Module with features to ADD/REMOVE Notifiers
var modMembers       = require("./modMembers");       // Module with features to Show Members of the Space (no bots or monitors)
var modNotifications = require("./modNotifications"); // Module with features to Notify when new people ENTERS and EXITS to a Space
var modUtils         = require("./modUtils");         // Module with features (some hidden) to that cannot be clasified easily


//////
//
// HERE WE PERFORM THE INITIAL CONFIGURATION OF MYSQL
//

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : config.mySqlHost,
  user     : config.mySqlUser,
  password : config.mySqlPassword,
  database : config.mySqlDB
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('MYSQL SUCCESS!! Connected as id ' + connection.threadId);

});

//
// END OF MYSQL SETUP
//
//////



//////
//
// THE SETUP Starts...
//
// OK, we will now prepare everything (FLINT, EXPRESS, etc)
//


var mokDebug = config.mokDebug;

var webhookUrl = config.publicUrl + ":" + config.port + config.route;

if (mokDebug) {
  console.log("\n\n");

  console.log("File Al bot Default: ", images.fileAlBotDefault);
  console.log("\n\n");

  console.log("Name: ",                        config.name);
  console.log("Web Hook URL (Defined)    : " , config.webhookUrl);
  console.log("Web Hook URL (Constructed): " , webhookUrl);
  console.log("Token: " ,                      config.token);
  console.log("Port: " ,                       config.port)
  console.log("\n\n");

  console.log("mokDebug: " ,                   config.mokDebug)
  console.log("\n\n");
}



app.use(bodyParser.json());


// flint options
var configflint = {
  name: config.name,
  webhookUrl: config.webhookUrl,
  token: config.token,
  port: config.port,
};



// init flint
var flint = new Flint(configflint);

flint.start();



// define express path for incoming webhooks
app.post(config.route, webhook(flint));



// start express server
var server = app.listen(config.port, function () {
  flint.debug('Flint listening on port %s', config.port);
  console.log('Flint listening on port %s', config.port);
});



//
//
// END OF THE SETUP...Lets start something...
//
//////////////////////////


/////////////
//
// All the FLINT EVENTS and HEARS are serviced by MODULES that will be in a file called modXXXX.js
//
// I do this to avoid having a VERY LONG index.js file (which was the case when I started...)
//
////


////////
//
// Let's start with the EVENTS (flint.on)
//

flint.on('personEnters', function(bot, person, id) { modNotifications.personEnters(bot, person, connection) });  // Send notifications when someone ENTERS a Space

flint.on('personExits',  function(bot, person, id) { modNotifications.personExits(bot, person, connection)  });  // Send notifications when someone EXITS a Space


////////
//
// Now we move on to the MODIFIERS that I will respond to (flint.hears)
//

flint.hears('/boca',      function(bot, trigger) { modUtils.boca(bot, trigger)                     });  // Hidden feature to test if this works

flint.hears('/showtable', function(bot, trigger) { modUtils.showtable(bot, trigger, connection)    });   // Hidden feature that will show ALL the Table

flint.hears('/avatar',    function(bot, trigger) { modAvatar.avatar(bot, trigger, connection)      });   // Show me the AVATAR of the user when sending me 1:1 messages

flint.hears('/noavatar',  function(bot, trigger) { modAvatar.noavatar(bot, trigger, connection)    });   // Do NOT Show me the AVATAR of the user when sending me 1:1 messages

flint.hears('/addme',     function(bot, trigger) { modNotifiers.addme(bot, trigger, connection)    });   // RemoveMe from the list of people that receives notifications

flint.hears('/removeme',  function(bot, trigger) { modNotifiers.removeme(bot, trigger, connection) });   // RemoveMe from the list of people that receives notifications

flint.hears('/showme',    function(bot, trigger) { modNotifiers.showme(bot, trigger, connection)   });   // ShowMe the list of people that receives notifications

flint.hears('/members',   function(bot, trigger) { modMembers.app(bot, trigger, flint)             });   // Show the members of the Space (no bots and no monitors)

flint.hears('/ayuda',     function(bot, trigger) { modUtils.ayuda(bot, trigger)                    });   // Show the HELP information in Spanish (AYUDA)

flint.hears('/help',      function(bot, trigger) { modUtils.help(bot, trigger)                     });   // Show the HELP information in English

flint.hears('/hola',      function(bot, trigger) { modUtils.hola(bot, trigger)                     });   // Show the HELLO greeting in Spanish (HOLA)

flint.hears('/hello',     function(bot, trigger) { modUtils.hello(bot, trigger)                    });   // Show the HELLO greeting

flint.hears('/foto',      function(bot, trigger) { modUtils.foto(bot, trigger)                     });   // Show the PHOTO greeting (Testing purposes)





//////////////////////////////////////////////////////////////////////////////
//
//
// I will leave some code in the main file that basically
//
// sets ups or closes everything...
//
//
///////////////////////



// say byebye
flint.hears('/byebye', function(bot, trigger) {
  flint.debug('stoppping...');
  console.log('stoppping...');
  bot.say({markdown: '**BOT STOPPED!** \n\n We are very sad to leave  ...'});

  //MYSQL CLOSE
  connection.destroy();

  server.close();
  flint.stop().then(function() {
    process.exit();
    });
});







// gracefully shutdown (ctrl-c)
process.on('SIGINT', function() {
  flint.debug('stoppping...');
  console.log('stoppping...');

  //MYSQL CLOSE
  connection.destroy();

  server.close();
  flint.stop().then(function() {
    process.exit();
  });

});
