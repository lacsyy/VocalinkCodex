import { io, Socket } from 'socket.io-client';
import { CaptionMessage } from '@/types';

let socket: Socket | null = null;

const socketUrl = process.env.EXPO_PUBLIC_SOCKET_URL ?? 'http://localhost:4000';

export const getSocket = () => {
  if (!socket) {
    socket = io(socketUrl, {
      transports: ['websocket'],
      reconnection: true,
    });
  }
  return socket;
};

export const subscribeToCaptions = (callback: (caption: CaptionMessage) => void) => {
  const activeSocket = getSocket();
  activeSocket.on('caption:new', callback);

  return () => {
    activeSocket.off('caption:new', callback);
  };
};
