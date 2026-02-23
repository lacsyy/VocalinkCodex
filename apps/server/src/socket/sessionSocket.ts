import { Server } from 'socket.io';
import { randomUUID } from 'node:crypto';

const demoCaptions = [
  'Good morning class, open your communication tablets.',
  'Today we will practice emotions and classroom requests.',
  'Remember: you can tap icons if speaking is difficult.',
];

export function registerSessionSocket(io: Server) {
  io.on('connection', (socket) => {
    let pointer = 0;
    const interval = setInterval(() => {
      const text = demoCaptions[pointer % demoCaptions.length];
      pointer += 1;
      socket.emit('caption:new', {
        id: randomUUID(),
        text,
        timestamp: Date.now(),
        speaker: 'teacher',
      });
    }, 7000);

    socket.on('disconnect', () => clearInterval(interval));
  });
}
