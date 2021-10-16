require('dotenv').config();
const Telegraf = require('telegraf');
const { price } = require('./src/services/api-helper');
const { comparePrice } = require('./src/services/api-helper');
const { setIntervalAsync } = require('set-interval-async/dynamic');


const bot = new Telegraf(process.env.TOKEN);//instanciate a new Telegraf session.

let chatId;
let ethereumPrice = [];


const helpMessage = `
bot commands:\n
/watchprice [price] - to save a price
example: /watchprice 1000
/help - command reference
`;

bot.start((ctx) => {
  chatId = ctx.message.chat.id//assigns chat id to to variable.
  return ctx.reply(`Hi I am ethereum alert Bot.\n${helpMessage}`);
  // ctx.reply(helpMessage);
  
});

bot.help((ctx) => {
 return ctx.reply(helpMessage);
});

bot.use((ctx, next) => {
  ctx.state.userPrice;
  // chatId = ctx.message.chat.id//in case user doesn't use the start command, assigns chat id to to variable here.
  ctx.state.checkForPrice = 'off';
  next(ctx);
  /**
   * Get the ethereum price and check it against the users entered price every thirty seconds.
   */
  setIntervalAsync(
    async () => {
      let resp = await price();// Get the ethereum price
      ethereumPrice.push(resp);//Save return to array
      if (ethereumPrice[ethereumPrice.length - 1] < ctx.state.userPrice) {
        await comparePrice(ctx.state.userPrice, chatId);
        ctx.state.userPrice = 0;//reset user price
      };
      if (ethereumPrice.length > 1) {
        ethereumPrice.pop();//keep ethereum price array at 1 to keep memory usage low
      };
    },
    30000
  );
});

bot.command("watchprice", (ctx) => {
  let input = ctx.message.text;//capture the users input

  let inputArray = input.split(" ");//turn the input into an array to iterate through

  let message = "";

  let regex = /[a-z]/i
  if (inputArray.length === 1) {//check that user didn't just input the watchprice command.
    message = "Please enter a price after /watchprice."
  } else if (inputArray.length > 2) {//check that user only entered a single price.
    message = "Please only enter a single price after /watchprice.\nExample: /watchprice 1234"
  }else if (regex.test(inputArray.pop())) {//check if user input is anything but an integer
    message = "Please only enter a single numerical value after /watchprice."
  } else {
    ctx.state.userPrice = input.split(" ").pop()//set userPrice
    message = `Thank you for entering your price, I will alert you if ethereum gas price matches or is below ${ctx.state.userPrice}.`
  };

  return ctx.reply(message);
});



// bot.launch();

// exports.handler = (event, context, callback) => {
//   const tmp = JSON.parse(event.body); // get data passed to us
//   bot.handleUpdate(tmp); // make Telegraf process that data
//   return callback(null, { // return something for webhook, so it doesn't try to send same stuff again
//     statusCode: 200,
//     body: '',
//   });
// };