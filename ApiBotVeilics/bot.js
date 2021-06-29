const { Telegraf } = require('telegraf');

const bot = new Telegraf('1872493842:AAEFawo58XvBkXzWPVGNerOIl8ylq5XXrXE');

const axios = require('axios');

const fs = require('fs');

bot.command('start', ctx => {
  ctx.telegram.sendMessage(ctx.chat.id, "Let's get started!");
});

bot.command('fortune', ctx => {
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

bot.command('cat', async ctx => {
  let input = ctx.message.text;
  let inputArray = input.split(' ');

  if (inputArray.length == 1) {
    try {
      let res = await axios.get('https://aws.random.cat/meow');
      ctx.replyWithPhoto(res.data.file);
    } catch (e) {
      console.log(e);
    }
  } else {
    inputArray.shift();
    input = inputArray.join(' ');
    ctx.replyWithPhoto(`https://cataas.com/cat/says/${input}`);
  }
});

// bot.command('dog', ctx => {
//   let rawData = fs.readFileSync('./dogbreeds.json', 'utf8');
//   let data = JSON.parse(rawData);

//   let message = 'Dog Breeds:\n';
//   data.forEach(item => {
//     message += `-${item}\n`;
//   });
//   ctx.reply(message);
// });

bot.command('dog', ctx => {
  let rawData = fs.readFileSync('./dogbreeds.json', 'utf8');
  let data = JSON.parse(rawData);

  let message = 'Dog Breeds:\n';
  data.forEach(item => {
    message += `-${item}\n`;
  });
  ctx.reply(message);

  let input = ctx.message.text.split(' ');

  if (input.length != 2) {
    ctx.reply('You must give a dog breed as the second argument');
    return;
  }

  let breedInput = input[1];

  if (data.includes(breedInput)) {
    axios
      .get(`https://dog.ceo/api/breed/${breedInput}/images/random`)
      .then(res => {
        console.log(res);
      })
      .catch(e => {
        console.log(e);
      });
  }
});

bot.launch();
