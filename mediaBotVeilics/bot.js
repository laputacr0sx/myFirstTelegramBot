const { Telegraf } = require('telegraf');
const bot = new Telegraf('1857199167:AAGTdnWt-dIRyOzAYthrk8vL8BSlkszR4Pk');

bot.command('newyork', ctx => {
  bot.telegram.sendChatAction(ctx.chat.id, 'upload_photo');
  bot.telegram.sendPhoto(
    ctx.chat.id,
    { source: 'res/newyork.jpg' },
    {
      reply_to_message_id: ctx.message.message_id,
    }
  );
});

bot.launch();
