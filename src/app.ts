import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/product/product.route';
import { OrderRoutes } from './app/modules/order/order.route';
const app: Application = express();

// parser
app.use(cors());
app.use(express.json());

// application routes
app.use('/api/products', StudentRoutes);
app.use('/api/orders', OrderRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Management system app is running on port 5000');
});

app.all('*', function (req, res) {
  res.send({
    success: false,
    message: 'Route not found',
  });
});

export default app;
