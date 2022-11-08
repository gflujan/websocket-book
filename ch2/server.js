const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({ port: 8122 });

const stocks = {
  AAPL: 95.0,
  AMZN: 300.0,
  GOOG: 550.0,
  MSFT: 50.0,
  YHOO: 35.0,
};

const randomInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

let stockUpdaterTimeoutId;

const randomStockUpdater = () => {
  for (const symbol in stocks) {
    if (stocks.hasOwnProperty(symbol)) {
      const randomizedChange = randomInterval(-150, 150);
      const floatChange = randomizedChange / 100;
      stocks[symbol] += floatChange;
    }
  }

  const randomMillisTime = randomInterval(500, 2500);

  stockUpdaterTimeoutId = setTimeout(() => {
    randomStockUpdater();
  }, randomMillisTime);
};

randomStockUpdater();

wss.on('connection', (ws) => {
  let clientStockUpdaterIntervalId;

  const sendStockUpdates = (ws) => {
    if (ws.readyState === 1) {
      const stocksObj = {};

      for (let i = 0; i < clientStocks.length; i += 1) {
        symbol = clientStocks[i];
        stocksObj[symbol] = stocks[symbol];
      }

      ws.send(JSON.stringify(stocksObj));
    }
  };

  clientStockUpdaterIntervalId = setInterval(() => {
    sendStockUpdates(ws);
  }, 1000);

  const clientStocks = [];

  ws.on('message', (message) => {
    const stockRequest = JSON.parse(message);
    sendStockUpdates(ws);
  });

  ws.on('close', () => {
    if (typeof clientStockUpdaterIntervalId !== 'undefined') {
      clearInterval(clientStockUpdaterIntervalId);
    }
  });
});
