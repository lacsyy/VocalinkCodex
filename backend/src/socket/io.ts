import { randomUUID } from 'node:crypto';
import { Server } from 'socket.io';

let ioRef: Server | null = null;

export function setIO(io: Server) {
  ioRef = io;
}

export function emitCaption(text: string) {
  if (!ioRef) {
    return;
  }

  ioRef.emit('caption:new', {
    id: randomUUID(),
    text,
    timestamp: Date.now(),
    source: 'teacher',
  });
}
