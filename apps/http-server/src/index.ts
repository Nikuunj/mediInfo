import express from 'express';
import cors from 'cors';
import { frontend_url }  from './config/config'

import { itemRoute } from './routes/items';
import { admin } from './routes/admin';

const app = express();

app.use(cors({
    origin: ['http://localhost:3000', frontend_url]
}));

app.use('/v1/item', itemRoute);
app.use('/v1/admin', admin);

app.listen('3001');