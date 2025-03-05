const axios = require('axios');

async function fetchCandlestickData(symbol = 'BTCUSDT', interval = '4h', limit = 2) {
  try {
    const response = await axios.get('https://api.binance.com/api/v3/klines', {
      params: {
        symbol,
        interval,
        limit
      }
    });
    return response.data.map(candle => ({
      openTime: candle[0],
      open: parseFloat(candle[1]),
      high: parseFloat(candle[2]),
      low: parseFloat(candle[3]),
      close: parseFloat(candle[4]),
      closeTime: candle[6]
    }));
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu từ API:', error.message);
    return null;
  }
}

module.exports = { fetchCandlestickData };