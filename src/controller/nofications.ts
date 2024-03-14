import { Notification } from "../entity/notifications";
import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import jwt from "jsonwebtoken";

const secret: string = process.env.JWT_SECRET!;

export const createNotification = async (req: Request, res: Response) => {
  const { title, message, status } = req.body;
  try {
    const notification = new Notification();
    notification.title = title;
    notification.message = message;
    notification.status = status;

    await AppDataSource.getRepository(Notification).save(notification);

    res.json(notification);
  } catch (error) {
    console.error("Error creating notification:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// get nofication
export const getNotification = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.json({ noTokenError: "Unauthorized - Token not available" });
    }

    const decoded = jwt.verify(token, secret) as { id: string };
    const userId = decoded.id;

    const notifications = await AppDataSource.getRepository(Notification).find({
      where: { user: { id: decoded.id } },
    });

    if (!notifications) {
      return res.json({ error: "Notification not found" });
    }

    res.json({ notifications: notifications });
  } catch {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
