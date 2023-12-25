import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/connectDB.js';


dotenv.config();

const app = express();
const port = 4000;


app.use(cors());
app.use(express.json());
connectDB();





app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
});
