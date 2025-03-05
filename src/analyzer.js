function analyzeCandles(candles) {
  if (!candles || candles.length < 2) {
    return 'Không đủ dữ liệu để phân tích.';
  }

  const [candle1, candle2] = candles;

  // Xác định loại nến
  const isCandle1Bullish = candle1.close > candle1.open;
  const isCandle2Bullish = candle2.close > candle2.open;

  // Tính kích thước thân nến
  const candle1Body = Math.abs(candle1.close - candle1.open);
  const candle2Body = Math.abs(candle2.close - candle2.open);

  // In thông tin hai nến
  console.log('Nến 1:', isCandle1Bullish ? 'Tăng' : 'Giảm', `- Thân: ${candle1Body.toFixed(2)} USDT - Time: ${candle1.closeTime}`);
  console.log('Nến 2:', isCandle2Bullish ? 'Tăng' : 'Giảm', `- Thân: ${candle2Body.toFixed(2)} USDT - Time: ${candle2.closeTime}`);

  // Dự đoán nến thứ 3
  if (isCandle1Bullish && isCandle2Bullish) {
    return 'Cây nến thứ 3 có khả năng tiếp tục TĂNG (Bullish)';
  } else if (!isCandle1Bullish && !isCandle2Bullish) {
    return 'Cây nến thứ 3 có khả năng tiếp tục GIẢM (Bearish)';
  } else if (isCandle1Bullish && !isCandle2Bullish && candle2Body > candle1Body) {
    return 'Cây nến thứ 3 có thể GIẢM tiếp (Bearish Engulfing)';
  } else if (!isCandle1Bullish && isCandle2Bullish && candle2Body > candle1Body) {
    return 'Cây nến thứ 3 có thể TĂNG tiếp (Bullish Engulfing)';
  } else {
    return 'Cây nến thứ 3 có thể do dự hoặc đảo chiều (kiểm tra thêm mẫu hình)';
  }
}

module.exports = { analyzeCandles };