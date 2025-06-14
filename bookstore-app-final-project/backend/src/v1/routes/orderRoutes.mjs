import { Router } from 'express';
import * as orderController from '../controllers/orderController.mjs';
import orderValidationSchema from '../../../validation/orderValidationSchema.mjs';
import { checkAuth, checkPermission } from '../../../middleware/authMiddleware.mjs';
import { validateRequest } from '../../../middleware/validationMiddleware.mjs';
import { ACTION_TYPES, RESOURCE_TYPES, generatePermission } from '../../../services/permissions-handler/permissionsConst.mjs';

const router = Router();


router.get(
  '/user',
  checkAuth,
  orderController.getUserOrders
);


router.get(
  '/:orderId',
  checkAuth,
  orderController.getOrderDetails
);


router.post(
  '/',
  checkAuth,
  checkPermission(generatePermission(ACTION_TYPES.CREATE, RESOURCE_TYPES.ORDER)),
  orderValidationSchema,
  validateRequest,
  orderController.createOrder
);


router.put(
  '/:id/status',
  checkAuth,
  checkPermission(generatePermission(ACTION_TYPES.UPDATE, RESOURCE_TYPES.ORDER)),
  validateRequest,
  orderController.updateOrderStatus
);

export default router;