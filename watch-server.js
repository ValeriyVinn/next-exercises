// node watch-server.js


// import { WebSocketServer } from 'ws';
// import fs from 'fs';
// import path from 'path';

// const wss = new WebSocketServer({ port: 8080 });
// const watchedFile = path.resolve('public/vanilla/websocket-test.js');

// wss.on('connection', function connection(ws) {
//   console.log('🟢 Клієнт підключився');
//   ws.send('Вітаю! Ви підключились до WebSocket-сервера.');

//   ws.on('message', function message(data) {
//     console.log('📩 Від клієнта:', data.toString());
//   });
// });

// fs.watch(watchedFile, (eventType, filename) => {
//   if (filename && eventType === 'change') {
//     console.log('📝 Файл змінено:', filename);

//     // Надсилаємо всім клієнтам команду "start"
//     wss.clients.forEach(client => {
//       if (client.readyState === 1) {
//         client.send(JSON.stringify({ type: 'start' }));
//       }
//     });
//   }
// });





