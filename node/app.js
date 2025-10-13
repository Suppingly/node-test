import express from 'express';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRouter.js';
import logger from './middlewares/logger.js';

const app = express();
const PORT = 4100;

app.use(express.json());
app.use(cookieParser());
app.use(logger);

app.use('/users', userRouter);

app.get('/', (req, res) => {
    res.send('Hello express server');
});
app.get('/greet/:name', (req, res) => {
    const { name } = req.params;
    res.send(`Hello ${name}`);
});
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));