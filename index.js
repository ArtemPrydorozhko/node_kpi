const Telegraf  = require('telegraf');
const getSchedule = require('./parse');

const firebase = require('firebase');
var serviceAccount = require("./accountdb.json");
firebase.initializeApp({
        serviceAccount: serviceAccount,
        databaseURL: "https://testbot-4a4e7.firebaseio.com"
});

var ref = firebase.database().ref().child('messages');

const bot = new Telegraf('803465271:AAGpYdbzntcUgNcz_D9puE46gEUBZsxrFTs');

bot.start((ctx) => ctx.reply('Hello! enter "get"'));
bot.hears( 'get',(ctx) => getSchedule(ctx.message.text).then(result => {
        ref.set({time: new Date().toString(), text: result});
        ctx.reply(result);
}).catch(() => ctx.reply('Error occured')));

bot.startPolling();

// bot.telegram.setWebhook('https://node-kpi-bot.artemap85.now.sh');

// module.exports = bot.webhookCallback('/');