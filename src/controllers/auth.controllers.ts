import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { ApiError } from "../utils/ApiError.js";
import config from "../config/config.js";

export const login = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (email !== "john@gmail.com" || password !== "pass#123") {
      throw new ApiError(401, "Invalid email or password");
    }

    const token = jwt.sign({ email }, config.tokenSecret, { expiresIn: "2d" });

    const options = {
      httpOnly: true,
      secure: true,
    };

    res
      .status(200)
      .cookie("token", token, options)
      .json({ message: "User logged in successfully" });
  },
);
