const express=require("express")
const Crypto=require('../models/Crypto')
const router=express.Router()
const layoutquad='../views/layouts/main'
const User=require('../models/Crypto')
router.get('/api/fetch-tickers', async (req, res) => {
    try {
      const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
      const tickers = Object.values(response.data).slice(0, 10);
  
      const cryptoData = tickers.map(ticker => ({
        name: ticker.name,
        last: ticker.last,
        buy: ticker.buy,
        sell: ticker.sell,
        volume: ticker.volume,
        base_unit: ticker.base_unit
      }));
  
      await Crypto.deleteMany({});
      await Crypto.insertMany(cryptoData);
      res.status(200).send('Top 10 cryptocurrencies fetched and saved successfully.');
    } catch (error) {
      res.status(500).send('Error fetching data');
    }
  });
  router.get('/', async (req, res) => {
    try {
      const cryptos = await Crypto.find().limit(10);
      res.render('hodlinfo/index', { cryptos });
    } catch (error) {
      res.status(500).send('Error fetching data');
    }
  });
module.exports=router