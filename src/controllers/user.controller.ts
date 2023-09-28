import { Request, Response } from "express";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    // @ts-ignore
    const user = await User.login(email, password);
    return user;
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    // @ts-ignore
    const user = await User.signup(name, email, password);
    return user;
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
