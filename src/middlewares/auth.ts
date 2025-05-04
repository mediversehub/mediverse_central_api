import { Response, NextFunction } from "express";
import logger from "../utils/logger";
import { generateAccessToken, verifyAccessToken } from "../utils/tokens";
import { DecodedToken, RequestType } from "../types/express";
import AppError from "../utils/app_error";

export const auth = async (
  req: RequestType,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const accessToken = req.cookies?.accessToken;
    const refreshToken = req.cookies?.refreshToken;

    if (accessToken) {
      try {
        const decoded: DecodedToken = verifyAccessToken(accessToken);
        req.user = decoded;
        return next();
      } catch (error) {
        // Access token invalid, fall through to refresh token check by gibing a warning on console
        logger.warn("Access token invalid, checking refresh token");
      }
    }

    if (refreshToken) {
      try {
        const decoded: DecodedToken = verifyAccessToken(refreshToken);
        const newAccessToken = generateAccessToken(decoded.id);

        res.cookie("accessToken", newAccessToken, {
          httpOnly: true,
          sameSite: "strict",
          secure: process.env.NODE_ENV === "production",
        });

        req.user = decoded;
        return next();
      } catch (error) {
        // Both tokens invalid, fall through to error handling by giving a warning on console
        logger.warn("Refresh token invalid");
      }
    }

    // No valid token, so will just proceed on to clearing cookies and sending Unauthorized error to client through our last middleware
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    return next(new AppError("Unauthorized: Invalid or expired tokens", 401));
  } catch (error) {
    logger.error("Auth middleware error", error);
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    return next(new AppError("Internal Server Error", 500));
  }
};
