const axios = require('axios');

const baseUrl = process.env.BASEURL;//api url for ethereum price
const api = axios.create({
  baseURL: baseUrl
});

const headers = {
  'Content-Type': 'application/json'
};

const price = async () => {
  const resp = await api.get()
  return resp.data.gasPriceRange[4]
};


const comparePrice = async (usersPrice, chatId) => {
    try {
    await axios.post(`${process.env.TEXTAPI}${chatId}&text=The etherium gas price is now below your target price of ${usersPrice}\nThank you for using our service.\nUse /watchprice command to enter a new price.`, {headers : headers})
  } catch (err) {
      console.log(err)
  };
};

exports.price = price;
exports.comparePrice = comparePrice;