import cors from 'cors';
import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { env } from './config/env';
import { healthRouter } from './routes/health';
import { phrasesRouter } from './routes/phrases';
import { transcriptsRouter } from './routes/transcripts';
import { registerSessionSocket } from './socket/sessionSocket';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/health', healthRouter);
app.use('/phrases', phrasesRouter);
app.use('/transcripts', transcriptsRouter);

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });
registerSessionSocket(io);

httpServer.listen(env.PORT, '0.0.0.0', () => {
  console.log(`VocaLink server running on http://localhost:${env.PORT}`);
});
