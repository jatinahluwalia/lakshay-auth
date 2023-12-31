import { Request, Response } from "express";
import User from "../models/user.model.js";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    // @ts-ignore
    const user = await User.login(email, password);
    return res.json(user);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    // @ts-ignore
    const user = await User.signup(name, email, password);
    return res.json(user);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
