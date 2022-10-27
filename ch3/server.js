const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({ port: 8123 });
const uuidv4 = require('uuid').v4;

const clients = [];

wss.on('connection', (ws) => {
   const clientId = uuidv4();
   let nickname = clientId.substr(0, 8);
   console.log('A client has connected.', { clientId, nickname });
   clients.push({ id: clientId, nickname, ws });

   ws.on('message', (message) => {
      if (message.indexOf('/nick') === 0) {
         const nicknameChunks = message.split(' ');

         if (nicknameChunks.length >= 2) {
            const oldNickname = nickname;
            nickname = nicknameChunks[1];

            for (let i = 0; i < clients.length; i += 1) {
               const client = clients[i];
               const { id, ws: clientSocket } = client;
               const nicknameMessage = `Client ${oldNickname} changed to ${nickname}.`;

               clientSocket.send(
                  JSON.stringify({
                     id,
                     nickname,
                     nicknameMessage,
                  }),
               );
            }
         }
      }

      for (let i = 0; i < clients.length; i += 1) {
         const client = clients[i];
         const { id, ws: clientSocket } = client;
         console.log(`[${id}]: Client sent the following message: ${message}`);
         clientSocket.send(JSON.stringify({ id, message }));
      }
   });

   ws.on('close', () => {
      for (let i = 0; i < clients.length; i += 1) {
         const client = clients[i];
         const { id } = this.client;

         if (id === clientId) {
            console.log('A client has disconnected.', { clientId: id });
            clients.splice(i, 1);
         }
      }
   });
});
