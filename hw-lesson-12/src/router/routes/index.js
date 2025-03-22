import authRoutes from './auth';
import errorRoutes from './errors';
import generalRoutes from './general';
import lessonRoutes from './lessons';

const routes = [
  ...generalRoutes,
  ...authRoutes,
  ...lessonRoutes,
  ...errorRoutes
];

export default routes;
