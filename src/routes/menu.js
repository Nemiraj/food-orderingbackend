import express from 'express';
import MenuItem from '../models/MenuItem.js';

const router = express.Router();

// GET /api/menu?restaurantId=xxx
router.get('/', async (req, res) => {
  try {
    const { restaurantId } = req.query;
    if (!restaurantId) return res.status(400).json({ message: 'restaurantId is required' });

    const items = await MenuItem.find({ restaurantId, isAvailable: true });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
