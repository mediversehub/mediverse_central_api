import { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
const router = Router();

import { AuthController } from '../controllers/auth';
import { validateRequest } from '../middlewares/validate_request';
import { loginSchema } from '../schemas/login_schema';
import { uniqueUsernameSchema } from '../schemas/unique_username_schema';

const authController = new AuthController();

router.route('/self').get(expressAsyncHandler(authController.self));

router
  .route('/is-username-unique')
  .post(
    validateRequest(uniqueUsernameSchema),
    expressAsyncHandler(authController.isUsernameUnique)
  );

router
  .route('/login')
  .post(
    validateRequest(loginSchema),
    expressAsyncHandler(authController.login)
  );

export default router;
