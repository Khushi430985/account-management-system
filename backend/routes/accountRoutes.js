import express from "express"

import {
  getBalance,
  transferMoney,
  getStatement
} from "../controllers/accountController.js"

import { protect } from "../middlewares/authMiddleware.js"

const router = express.Router()

router.get("/balance", protect, getBalance)
router.post("/transfer", protect, transferMoney)
router.get("/statement", protect, getStatement)

export default router