import express from 'express'
import connToDB from './db.js';
import dotenv from 'dotenv'
import cors from 'cors';
import routes from './routes/route.js'

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();


app.use(express.json());
app.use(cors());

app.use('/', routes);

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.listen(PORT, () => {
    connToDB();
    console.log(`Server is running on port ${PORT}`);
});
