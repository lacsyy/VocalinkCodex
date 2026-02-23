import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { env } from './config/env';
import { errorHandler } from './middleware/errorHandler';
import { authRoutes } from './routes/authRoutes';
import { phraseRoutes } from './routes/phraseRoutes';
import { logRoutes } from './routes/logRoutes';
import { captionRoutes } from './routes/captionRoutes';
import { studentRoutes } from './routes/studentRoutes';
import { setIO } from './socket/io';

const app = express();

app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN }));
app.use(morgan('dev'));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
    standardHeaders: true,
    legacyHeaders: false,
  }),
);
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'vocalink-backend' });
});

app.use('/api/auth', authRoutes);
app.use('/api/phrases', phraseRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/captions', captionRoutes);
app.use('/api/student', studentRoutes);

app.use(errorHandler);

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: env.CORS_ORIGIN,
  },
});

setIO(io);

io.on('connection', (socket) => {
  socket.emit('caption:new', {
    id: 'welcome',
    text: 'Connected to live classroom captions.',
    timestamp: Date.now(),
    source: 'system',
  });
});

httpServer.listen(env.PORT, '0.0.0.0', () => {
  console.log(`Backend running at http://localhost:${env.PORT}`);
});
