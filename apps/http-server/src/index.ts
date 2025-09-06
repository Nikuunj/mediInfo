import express from 'express';
import cors from 'cors';
import { frontend_url }  from './config/config'

import { itemRoute } from './routes/items';
import { admin } from './routes/admin';

const app = express();

<<<<<<< HEAD
app.use(cors());
=======
app.use(cors({
    origin: ['http://localhost:3000', frontend_url]
})); 
>>>>>>> 2f371a7846b5f237263b8c61e72c36cbf76c5cb3

app.use(express.json());

app.use('/v1/item', itemRoute);
app.use('/v1/admin', admin);

app.listen('3002');