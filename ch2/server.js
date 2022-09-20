const ws = new WebSocket('ws://localhost:8123');

const stockRequest = {
   stocks: ['AAPL', 'MSFT', 'AMZN', 'GOOG', 'YHOO'],
};

const stocks = {
   AAPL: 0,
   MSFT: 0,
   AMZN: 0,
   GOOG: 0,
   YHOO: 0,
};
