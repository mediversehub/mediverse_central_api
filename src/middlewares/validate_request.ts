import { ZodError, ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";
import AppError from "../utils/app_error";

export const validateRequest = (
  schema: ZodSchema,
  source: "body" | "query" | "params" = "body"
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req[source];

      if (
        data === undefined ||
        data === null ||
        (typeof data === "object" && Object.keys(data).length === 0)
      ) {
        return next(new AppError(`Missing ${source} data in request`, 400));
      }

      schema.parse(data);

      next();
    } catch (error: any) {
      if (error instanceof ZodError) {
        const errorMessages =
          error.errors.map((err: any) => err.message).join(", ") ||
          "Invalid input";

        return next(new AppError(`Validation Error: ${errorMessages}`, 400));
      }
      return next(new AppError("Internal Server Error", 500));
    }
  };
};
