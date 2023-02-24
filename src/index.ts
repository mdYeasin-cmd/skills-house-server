import express, { Express, Request, Response } from 'express';
import cors from 'cors';
const app: Express = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response): void => {
    res.send('Skills House Server is running...');
})

app.listen(port, (): void => {
    console.log(`Skills House Server is running on port ${port}`);
});