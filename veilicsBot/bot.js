const { Telegraf } = require('telegraf');

const bot = new Telegraf('1856059031:AAHJlGVtg1tZ88azOxT_EXc4ezacM3nslvg');
bot.command('start', ctx => {
  ctx.reply('Hello World');
  bot.telegram.sendMessage(ctx.chat.id, 'Hello World');
});
bot.launch();
