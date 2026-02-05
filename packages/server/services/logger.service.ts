import winston from 'winston';
import 'winston-daily-rotate-file';

const logger = winston.createLogger({
   level: 'info',
   format: winston.format.combine(winston.format.json(), winston.format.colorize()),
   defaultMeta: { service: 'tiny-inventory' },
   transports: [],
});

if (Bun.env.NODE_ENV === 'production') {
   const rotateFileTransport = new winston.transports.DailyRotateFile({
      level: 'info',
      filename: 'src/logs/tiny-inventory-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
   });

   logger.add(rotateFileTransport);
} else {
   const consoleTransport = new winston.transports.Console({
      format: winston.format.simple(),
   });

   logger.add(consoleTransport);
}

process.on('unhandledRejection', (ex) => {
   throw ex;
});

process.on('uncaughtException', (ex) => {
   logger.error('Caught exception: ' + ex);
});

export default logger;
