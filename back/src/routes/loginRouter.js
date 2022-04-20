import { Router } from "express";

import { LoginService } from "../service/loginService";

import { verifyToken } from "../middleware/verifyToken";
const loginRouter = Router();

loginRouter.post("/login/modify", verifyToken, async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const userId = req.user;
    const updatedUser = await LoginService.modify({ userId, email, password, name });
    if (updatedUser.errorMessage) {
      throw new Error(updatedUser.errorMessage);
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

loginRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const discoveredUser = await LoginService.findUser({ email, password });
    res.status(200).json(discoveredUser);
  } catch (error) {
    next(error);
  }
});

loginRouter.get("/verify", verifyToken, (req, res) => {
  res.status(200).json({
    status: "succ",
    userId: req.user,
  });
});

export { loginRouter };