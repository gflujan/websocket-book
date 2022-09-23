const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({ port: 8123 });
const uuidv4 = require('uuid').v4;

const clients = [];

wss.on('connection', ws => {
   const clientId = uuidv4();
   console.log('A client has connected.', { clientId });
   clients.push({ id: clientId, ws });

   ws.on('message', message => {
      for (const client of clients) {
         const { id, ws: clientSocket } = client;
         console.log(`[${id}]: Client sent the following message: ${message}`);
         clientSocket.send(JSON.stringify({ id, message }));
      }
   });
});
