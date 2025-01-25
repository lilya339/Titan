import express from 'express';
import router from './routes';
import { config } from 'dotenv';
import { resolve } from 'path';
import cors from 'cors';


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

config({
    path: resolve(__dirname, '../.env'),
});

const port = process.env.PORT || 3000;
console.log("port", process.env.PORT);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.use('/api', router)
app.get('/', (req, res) => {
    res.send('Hello World!');
});
