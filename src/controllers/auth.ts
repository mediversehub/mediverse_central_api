import { Request, Response } from "express";
import logger from "../utils/logger";

export class AuthController {
  public login = async (req: Request, res: Response): Promise<any> => {
    logger.info("Login route accessed");

    // const { credential, password } = req.body;

    return res.status(401).json({ message: "Login failed" });

    logger.info("Login successful");

    return res.status(200).json({
      message: "Login successful",
    });
  };
}
