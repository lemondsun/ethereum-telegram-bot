const axios = require('axios');
require('dotenv').config();

const comparePrice = async (etheriumPrice, usersPrice) => {
  console.log('here',etheriumPrice, usersPrice, chatId)
  if (etheriumPrice <= usersPrice) {
    try {
    await axios.post(`${process.env.TEXTAPI}${chatId}&text=The etherium gas price is now below your target price of ${usersPrice}\nThank you for using our service.\nUse /watchprice command to enter a new price.`)
  } catch (err) {
      console.log(err)
    }
  };
};

exports.comparePrice = comparePrice;