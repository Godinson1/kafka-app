import express from "express";
import { createPost } from "./controller";

const router = express.Router();

router.post("/post", createPost);

export { router };
