
//////////////////////////////////////////////////////////////////////////////
// 
//
// modBoca sub-module: Core for the /boca modifier
//
// Part of the SparkSpaceMonitor APP
//
///////////////////////

module.exports.app = function(bot, trigger) {
  
  console.log('\n\nYa estamos adentro de Boca');
  
  bot.say({
    markdown: 'Hola ' + trigger.personDisplayName + '!\n\nSolo para que sepas que **Boca Juniors** es el UNICO GRANDE de la Argentina que NUNCA SE FUE A LA B!',
    files: ['http://k30.kn3.net/taringa/F/0/A/1/E/4/MisticaSB/658.jpg']
  });
};

