import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
const router = Router();

import { AuthController } from "../controllers/auth";
import { validateRequest } from "../middlewares/validate_request";
import { loginSchema } from "../schemas/auth/login_schema";
import { registerSchema } from "../schemas/auth/register_schema";
import { uniqueContactSchema } from "../schemas/auth/unique_contact_schema";
import { uniqueEmailSchema } from "../schemas/auth/unique_email_schema";
import { uniqueUsernameSchema } from "../schemas/auth/unique_username_schema";
import { verifyOtpSchema } from "../schemas/auth/verify_otp_schema";

const authController = new AuthController();

router.route("/self").get(expressAsyncHandler(authController.self));

router
  .route("/is-username-unique")
  .post(
    validateRequest(uniqueUsernameSchema),
    expressAsyncHandler(authController.isUsernameUnique)
  );

router
  .route("/is-email-unique")
  .post(
    validateRequest(uniqueEmailSchema),
    expressAsyncHandler(authController.isEmailUnique)
  );

router
  .route("/is-contact-unique")
  .post(
    validateRequest(uniqueContactSchema),
    expressAsyncHandler(authController.isContactUnique)
  );

router
  .route("/register")
  .post(
    validateRequest(registerSchema),
    expressAsyncHandler(authController.register)
  );

router
  .route("/verify-otp")
  .post(
    validateRequest(verifyOtpSchema),
    expressAsyncHandler(authController.verifyOtp)
  );

router
  .route("/login")
  .post(
    validateRequest(loginSchema),
    expressAsyncHandler(authController.login)
  );

router.route("/logout").post(expressAsyncHandler(authController.logout));

export default router;
