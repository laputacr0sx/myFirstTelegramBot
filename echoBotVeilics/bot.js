const { Telegraf } = require('telegraf');

const bot = new Telegraf('1895539978:AAFrmqY50JpYin5SYkieP-3vzpoNGmr_vvI');

const helpMessage = `
Please say something to me
/start - start the bot
/help - command reference
/echo - say "You said echo"
/echo <text> - send the message to all users
`;

bot.use((ctx, next) => {
  // console.log(ctx.from.username + ' said: ' + ctx.message.text);
  console.log(ctx.updateType);
  next();
});

bot.start(ctx => {
  ctx.reply('Hi I am echo bot');
  ctx.reply(helpMessage);
});

bot.help(ctx => {
  ctx.reply(helpMessage);
});

bot.command('echo', ctx => {
  let input = ctx.message.text;
  let inputArray = input.split(' ');
  let message = '';

  if (inputArray.length == 1) {
    message = 'you said echo';
  } else {
    inputArray.shift();
    message = inputArray.join(' ');
  }
  ctx.reply(message);
});

bot.launch();
