import express from 'express';
import { protect } from '../middleware/auth.js';

const router = express.Router();

const VALID_COUPONS = {
  SAVE10: 10,
  FIRST20: 20,
  RUSH5: 5,
};

// POST /api/coupons/validate
router.post('/validate', protect, (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ message: 'Coupon code is required' });

  const discount = VALID_COUPONS[code.toUpperCase()];
  if (discount) {
    res.json({ valid: true, discount, message: `Coupon applied! You save $${discount.toFixed(2)}` });
  } else {
    res.status(400).json({ valid: false, message: 'Invalid or expired coupon code.' });
  }
});

export default router;
