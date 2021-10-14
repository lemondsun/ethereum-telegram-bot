const Telegraf = require('telegraf');

 //handler to update state with user input
 bot.use((ctx, next) => {
  ctx.state.userPrice;
  chatId = ctx.message.chat.id
  next(ctx);

 SetIntervalAsync()
});
//handler for /start command
bot.start((ctx) => {
  ctx.reply("Hi I am ethereum alert Bot.");
  ctx.reply(helpMessage);
  chatId = ctx.message.chat.id
});
 //handler for /help command
bot.help((ctx) => {
  ctx.reply(helpMessage);
});
//handler for /watchprice command
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


  // //handler to update state with user input
  // bot.use((ctx, next) => {
  //   ctx.state.userPrice;
  //   chatId = ctx.message.chat.id
  //   next(ctx);
  
  //  SetIntervalAsync()
  // });
  // //handler for /start command
  // bot.start((ctx) => {
  //   ctx.reply("Hi I am ethereum alert Bot.");
  //   ctx.reply(helpMessage);
  //   chatId = ctx.message.chat.id
  // });
  //  //handler for /help command
  // bot.help((ctx) => {
  //   ctx.reply(helpMessage);
  // });
  // //handler for /watchprice command
  // bot.command("watchprice", (ctx) => {
  //   let input = ctx.message.text;//capture the users input
  
  //   let inputArray = input.split(" ");//turn the input into an array to iterate through
  
  //   let message = "";
  
  //   let regex = /[a-z]/i
  //   if (inputArray.length === 1) {//check that user didn't just input the watchprice command.
  //     message = "Please enter a price after /watchprice."
  //   } else if (inputArray.length > 2) {//check that user only entered a single price.
  //     message = "Please only enter a price after /watchprice.\nExample: /watchprice 1234"
  //   }else if (regex.test(inputArray.pop())) {//check if user input has anything after their price
  //     message = "Please only enter a single numerical value after /watchprice."
  //   } else {
  //     ctx.state.userPrice = input.split(" ").pop()
  //     message = `Thank you for entering your price, I will alert you if ethereum gas (${ethereumPrice[ethereumPrice.length-1]}) price matches or is below ${ctx.state.userPrice}.`
  //   }
  //   ctx.reply(message);
  // });

