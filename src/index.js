const { fetchCandlestickData } = require('./api');
const { analyzeCandles } = require('./analyzer');

// Thời gian 1 nến H4 (4 giờ) tính bằng milliseconds
const H4_INTERVAL = 4 * 60 * 60 * 1000; // 14,400,000 ms

// Hàm phân tích và dự đoán
async function analyzeAndPredict() {
  console.log(`[${new Date().toLocaleString()}] Đang lấy dữ liệu nến H4 của BTC/USDT...`);
  const candles = await fetchCandlestickData('BTCUSDT', '4h', 2);

  if (candles) {
    console.log('Dữ liệu nến đã lấy thành công!');
    const prediction = analyzeCandles(candles);
    console.log('Dự đoán:', prediction);

    // Tính thời gian chờ đến khi nến tiếp theo đóng
    const lastCandleCloseTime = candles[0].closeTime;
    const timeToNextCandle = lastCandleCloseTime + H4_INTERVAL - Date.now();
    console.log(`Thời gian chờ đến nến tiếp theo: ${(timeToNextCandle / 60000).toFixed(2)} phút`);
    return timeToNextCandle + 1000;
  } else {
    console.log('Không thể lấy dữ liệu nến.');
    return H4_INTERVAL; // Mặc định chờ 4 giờ nếu lỗi
  }
}

// Hàm chạy chương trình với interval động
async function startAnalyzer() {
  let initialDelay = await analyzeAndPredict(); // Chạy lần đầu tiên

  // Đặt interval dựa trên thời gian đóng nến
  setTimeout(() => {
    analyzeAndPredict(); // Chạy lần tiếp theo ngay sau khi nến đóng
    setInterval(analyzeAndPredict, H4_INTERVAL); // Lặp lại mỗi 4 giờ
  }, initialDelay);
}

console.log('Khởi động chương trình phân tích nến...');
startAnalyzer();