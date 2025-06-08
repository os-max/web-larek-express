import 'dotenv/config'
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import productRouter from './routes/product';
import orderRouter from './routes/order';
import { requestLogger, errorLogger } from './middlewares/logger';
import { errorHandler } from './middlewares/error-handler';
import { errors } from 'celebrate';
import cors from 'cors';

const { PORT = 3000 } = process.env;
const { DB_ADDRESS = 'mongodb://127.0.0.1:27017/weblarek' } = process.env;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors());
app.use(requestLogger);

app.use('/product', productRouter);
app.use('/order', orderRouter);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, async () => {
  try {
    await mongoose.connect(DB_ADDRESS)
  }
  catch (error) {
    console.log(error);
  }

  console.log(`listening on port ${PORT}`)
})