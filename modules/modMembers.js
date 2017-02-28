


//////////////////////////////////////////////////////////////////////////////
//
//
// modMembers sub-module: Code for the /members modifier
//
// Part of the SparkSpaceMonitor APP
//
///////////////////////


var config = require('./../config.js');
var mokDebug = config.mokDebug;

/////////////
//
// We want to know who is a member of this Room
//
////

// say members



module.exports.app = function(bot, trigger, flint) {


//flint.hears('/members', function(bot, trigger) {

  if (mokDebug) console.log(trigger.roomId);

  flint.spark.membershipsByRoom( trigger.roomId )
    .then(function(memberships) {
      // process memberships as array
      if (mokDebug) console.log(memberships);

      var mensajeAlBot = "These are the members of this group: ";
      var count = 1;

      memberships.forEach(function(membership) {
        if (mokDebug) console.log(membership.personEmail);

        if ( !membership.isMonitor && (membership.personEmail.slice(-11) != "sparkbot.io") )
                mensajeAlBot += "\n\n" + count++ + ". " + membership.personDisplayName + " (" + membership.personEmail + ") ";
      });


      bot.say({
           markdown: mensajeAlBot
         });
    })
    .catch(function(err) {
      // process error
      console.log(err);
    });

};
