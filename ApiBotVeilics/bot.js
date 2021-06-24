const { Telegraf } = require('telegraf');
const { axios } = require('axios').default;
const bot = new Telegraf('1872493842:AAEFawo58XvBkXzWPVGNerOIl8ylq5XXrXE');

bot.command('start', ctx => {
  ctx.telegram.sendMessage(ctx.chat.id, "Let's get started!");
});

bot.command('fortune', ctx => {
  const axios = require('axios');

  // Make a request for a user with a given ID
  axios
    .get('http://yerkee.com/api/fortune')
    .then(res => {
      ctx.reply(res.data.fortune);
    })
    .catch(e => {
      console.log(e);
    });
});

bot.launch();
