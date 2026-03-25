import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
  name: String,
  price: Number,
  quantity: Number,
});

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    restaurantName: String,
    customerName: String,
    customerAddress: String,
    customerPhone: String,
    paymentMethod: { type: String, enum: ['card', 'cash', 'wallet'], default: 'card' },
    items: [orderItemSchema],
    status: {
      type: String,
      enum: ['placed', 'preparing', 'on_the_way', 'delivered', 'cancelled'],
      default: 'placed',
    },
    subtotal: Number,
    deliveryFee: Number,
    discount: { type: Number, default: 0 },
    total: Number,
    couponCode: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);
