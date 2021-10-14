require('dotenv').config();
const Telegraf = require('telegraf');
const { price } = require('./src/services/api-helper');
const { comparePrice } = require('./src/services/api-helper');
const { setIntervalAsync } = require('set-interval-async/dynamic');


const bot = new Telegraf(process.env.TOKEN);//instanciate a new Telegraf session

let chatId;
let ethereumPrice = [];

const helpMessage = `
Say something to me
/watchprice [price] - to save a price
example: /watchprice 1000
/help - command reference
`;

bot.use((ctx, next) => {
  ctx.state.userPrice;
  chatId = ctx.message.chat.id
  next(ctx);

  setIntervalAsync(
    async () => {
      resp = await price();
      ethereumPrice.push(resp);
      await comparePrice(ethereumPrice[ethereumPrice.length - 1], ctx.state.userPrice, chatId);
      if (ethereumPrice.length > 1) {
        ethereumPrice.pop()
      }
    },
    60000
  );
});

bot.start((ctx) => {
  ctx.reply("Hi I am ethereum alert Bot.");
  ctx.reply(helpMessage);
  chatId = ctx.message.chat.id
});

bot.help((ctx) => {
  ctx.reply(helpMessage);
 
});

bot.command("watchprice", (ctx) => {
  let input = ctx.message.text;//capture the users input

  let inputArray = input.split(" ");//turn the input into an array to iterate through

  let message = "";

  let regex = /[a-z]/i
  if (inputArray.length === 1) {//check that user didn't just input the watchprice command.
    message = "Please enter a price after /watchprice."
  } else if (inputArray.length > 2) {//check that user only entered a single price.
    message = "Please only enter a price after /watchprice.\nExample: /watchprice 1234"
  }else if (regex.test(inputArray.pop())) {//check if user input has anything after their price
    message = "Please only enter a single numerical value after /watchprice."
  } else {
    ctx.state.userPrice = input.split(" ").pop()
    message = `Thank you for entering your price, I will alert you if ethereum gas (${ethereumPrice[ethereumPrice.length-1]}) price matches or is below ${ctx.state.userPrice}.`
  }
  ctx.reply(message);
});



bot.launch();