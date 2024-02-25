import express, { Request, Response } from "express";
import { User } from "../entity/user";
import { AppDataSource } from "../database/data-source";
import jwt from "jsonwebtoken";

const secret: string = process.env.secret ?? "";

export async function checkAndVerifyToken(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.json({ noTokenError: "Unauthorized - Token not provided" });
    } else {
      const decoded = jwt.verify(token, secret) as { loginkey: string };
      const user = await userRepository.findOne({
        where: { id: decoded.loginkey },
      });
      res.json({ user });

      // req.student = { studentId: student?.dataValues.studentId }
    }
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      res.json({ tokenExpiredError: "Unauthorized - Token has expired" });
    } else {
      res.json({
        verificationError: "Unauthorized - Token verification failed",
      });
    }
  }
}
