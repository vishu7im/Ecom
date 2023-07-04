import { Router } from "express";
import { Signup, login } from "../controllers/user.js";

const router = Router();

router.post("/signup", Signup);
router.post("/login", login);

export default router;
