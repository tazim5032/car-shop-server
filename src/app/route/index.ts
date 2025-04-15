import { Router } from 'express';
import { AuthValidationRoute } from '../modules/auth/auth.route';
import { UserRoutes } from '../modules/Users/user.route';
import { carRoutes} from '../modules/Products/product.routes';
import { AdminRoutes } from '../modules/Users/user.admin.route';
import { OrderRoutes } from '../modules/payment/payment.route';

const router = Router();

const moduleroutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
  {
    path: '/auth',
    route: AuthValidationRoute,
  },
  {
    path: '/car',
    route: carRoutes,
  },
  {
    path: '/order',
    route: OrderRoutes,
  },
];

moduleroutes.forEach((route) => router.use(route.path, route.route));

export default router;
