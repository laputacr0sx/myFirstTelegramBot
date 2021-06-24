const { Telegraf } = require('telegraf');
const bot = new Telegraf('1857199167:AAGTdnWt-dIRyOzAYthrk8vL8BSlkszR4Pk');

bot.command(['start', 'help'], ctx => {
  let message = `
  /newyork - get image of 
  `;
});

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
bot.command('dubai', ctx => {
  bot.telegram.sendChatAction(ctx.chat.id, 'upload_video');
  bot.telegram.sendAnimation(
    ctx.chat.id,
    'https://media.giphy.com/media/MVDPX3gaKFPuo/giphy.gif',
    {
      reply_to_message_id: ctx.message.message_id,
    }
  );
});

bot.command('cities', ctx => {
  let cities = [
    'res/dubai.jpg',
    'res/newyork.jpg',
    'res/hongkong.jpg',
    'res/singapore.jpg',
  ];

  let result = cities.map(city => {
    return { type: 'photo', media: { source: city } };
  });

  bot.telegram.sendChatAction(ctx.chat.id, 'upload_photo');
  bot.telegram.sendMediaGroup(ctx.chat.id, result);

  bot.command('citieslist', ctx => {
    bot.telegram.sendChatAction(ctx.chat.id, 'upload_document');
    bot.telegram.sendDocument(
      ctx.chat.id,
      {
        source: 'res/citieslist.txt',
      },
      { thumb: { source: 'res/dubai.jpg' } }
    );
  });
});

bot.command('singapore', ctx => {
  bot.telegram.sendChatAction(ctx.chat.id, 'find_location');
  bot.telegram.sendLocation(ctx.chat.id, 1.3521, 103.8198);
});

bot.command('showkeyboard', ctx => {
  ctx.telegram.sendChatAction(ctx.chat.id, 'typing');
  ctx.telegram.sendMessage(ctx.chat.id, 'please see below', {
    reply_markup: {
      keyboard: [
        [{ text: '/dubai' }, { text: '/newyork' }, { text: '/singapore' }],
        [
          { text: 'Google', url: 'https://google.com' },
          { text: '/showkeyboard' },
        ],
      ],
    },
  });
});

bot.on('message', ctx => {
  console.log(Object.keys(ctx.message));
});

bot.launch();
