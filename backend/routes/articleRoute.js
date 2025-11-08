import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createArticle, getArticles, deleteArticle } from "../controller/articleController.js";

const router = express.Router();

router.post("/create", protect, createArticle);
router.get("/", protect, getArticles);
router.delete("/:id", protect, deleteArticle);

export default router;
