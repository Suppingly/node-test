import express from 'express';
import cookieParser from 'cookie-parser';
import cartRouter from './routes/cartRouter.js';
import logger from './middlewares/logger.js';

const app = express();
const PORT = 4100;

app.use(express.json());
app.use(cookieParser());
app.use(logger);

app.use('/orders', cartRouter);

app.get('/', (req, res) => {
    res.send('Hello express server');
});
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));