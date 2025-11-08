import express from 'express'

import { summarizeText,getSummaries } from '../controller/summarizecontroller.js'

import { protect } from '../middleware/authMiddleware.js'

const router =  express.Router();

router.post("/summarize",protect , summarizeText)
router.get("/history", protect, getSummaries);


export default router;

