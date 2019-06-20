const Telegraf  = require('telegraf');
const getSchedule = require('./parse');

const bot = new Telegraf('803465271:AAGpYdbzntcUgNcz_D9puE46gEUBZsxrFTs');

bot.start((ctx) => ctx.reply('Hello! enter /get'));
bot.hears( 'get',(ctx) => getSchedule(ctx.message.text).then(result => {
        ctx.reply(result);
    })
    .catch(() => ctx.reply('Error occured')));

bot.telegram.setWebhook('https://node-kpi-bot-git-schedule.artemap85.now.sh');

module.exports = bot.webhookCallback('/');