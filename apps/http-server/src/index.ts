import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { itemRoute } from './routes/items';
import { admin } from './routes/admin';

const app = express();
dotenv.config();

app.use(cors());

app.use('/v1/item', itemRoute);
app.use('/v1/admin', admin);

app.listen('3001');