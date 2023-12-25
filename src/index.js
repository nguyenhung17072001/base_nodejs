import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'node:http';


import { connectDB } from './config/connectDB.js';
import route from './routes/index.js'


dotenv.config();

const app = express();
const server = createServer(app);



const port = 4000;


app.use(cors());
app.use(express.json());
connectDB();




route(app);

server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`)
});
