const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({ port: 8121 });

wss.on('connection', ws => {
   console.log('The client has connected...');

   ws.on('message', msg => {
      console.log(`Your incoming message is: ${msg}`);
   });
});
