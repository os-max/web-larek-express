import winston = require('winston');
import expressWinston = require('express-winston');
import path = require('path');

const timestampedFormat = winston.format.printf((info) => {
  const { timestamp, meta } = info;

  return `${timestamp}: ${JSON.stringify(meta, null, 2)}`;
});

export const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: 'request.log', dirname: path.join(__dirname, '../logs') }),
  ],
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    timestampedFormat,
  ),
});

export const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: 'error.log', dirname: path.join(__dirname, '../logs') }),
  ],
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    timestampedFormat,
  ),
});
