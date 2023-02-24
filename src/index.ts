import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { MongoClient, ServerApiVersion } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config();
const app: Express = express();
const port: string | 5000 = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.0nieed1.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });

async function run() {
    try {

    }
    finally {

    }
}

run().catch(error => console.log(error));


app.get('/', (req: Request, res: Response): void => {
    res.send('Skills House Server is running...');
})

app.listen(port, (): void => {
    console.log(`Skills House Server is running on port ${port}`);
});