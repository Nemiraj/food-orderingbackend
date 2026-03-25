import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    rating: { type: Number, default: 4.5 },
    deliveryTime: { type: String, default: '25-35 min' },
    deliveryFee: { type: Number, default: 2.99 },
    minOrder: { type: Number, default: 10 },
    imageUrl: { type: String },
    description: { type: String },
    isOpen: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('Restaurant', restaurantSchema);
