import express from "express";
import { login } from "../controllers/auth.js";

const router = express.Router();/* this will allow Express to indentify that these routes will all be configured and it allows us to have have in seperate files*/

router.post("/login", login);

export default router;