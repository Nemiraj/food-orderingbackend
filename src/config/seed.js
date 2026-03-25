import "dotenv/config";
import mongoose from "mongoose";
import Restaurant from "../models/Restaurant.js";
import MenuItem from "../models/MenuItem.js";

const RESTAURANTS_DATA = [
  {
    name: "Royal Biryani House",
    category: "Biryani",
    rating: 4.7,
    deliveryTime: "30-45 min",
    deliveryFee: 49,
    minOrder: 199,
    imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80",
    description: "Authentic Hyderabadi dum biryani with rich spices and slow-cooked flavors.",
    isOpen: true
  },
  {
    name: "Punjabi Tadka",
    category: "North Indian",
    rating: 4.6,
    deliveryTime: "25-40 min",
    deliveryFee: 39,
    minOrder: 149,
    imageUrl: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&q=80",
    description: "Butter chicken, naan, and classic Punjabi curries made with love.",
    isOpen: true
  },
  {
    name: "Udupi Delight",
    category: "South Indian",
    rating: 4.5,
    deliveryTime: "20-30 min",
    deliveryFee: 29,
    minOrder: 99,
    imageUrl: "https://images.unsplash.com/photo-1589308078055-832b1c8c3c0a?w=800&q=80",
    description: "Crispy dosas, idlis, vadas, and authentic South Indian meals.",
    isOpen: true
  },
  {
    name: "Chaat Junction",
    category: "Street Food",
    rating: 4.4,
    deliveryTime: "15-25 min",
    deliveryFee: 19,
    minOrder: 99,
    imageUrl: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80",
    description: "Delicious pani puri, chaat, and Indian street snacks.",
    isOpen: true
  },
  {
    name: "Mithai Mahal",
    category: "Desserts",
    rating: 4.6,
    deliveryTime: "20-30 min",
    deliveryFee: 29,
    minOrder: 149,
    imageUrl: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=800&q=80",
    description: "Traditional Indian sweets and desserts made fresh daily.",
    isOpen: true
  }
];

const MENU_DATA = [
  // Royal Biryani House (rIdx: 0)
  { rIdx: 0, name: "Chicken Dum Biryani", description: "Hyderabadi style slow-cooked chicken biryani", price: 249, category: "Biryani", imageUrl: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&q=80", isPopular: true },
  { rIdx: 0, name: "Mutton Biryani", description: "Tender mutton cooked with basmati rice and spices", price: 349, category: "Biryani", imageUrl: "https://images.unsplash.com/photo-1628294896516-52e1a96d2a3c?w=400&q=80", isPopular: true },
  { rIdx: 0, name: "Veg Biryani", description: "Mixed vegetables cooked with aromatic spices", price: 199, category: "Biryani", imageUrl: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=400&q=80", isPopular: false },

  // Punjabi Tadka (rIdx: 1)
  { rIdx: 1, name: "Butter Chicken", description: "Creamy tomato gravy with tender chicken", price: 289, category: "Main Course", imageUrl: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&q=80", isPopular: true },
  { rIdx: 1, name: "Paneer Butter Masala", description: "Soft paneer in rich gravy", price: 249, category: "Main Course", imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80", isPopular: true },
  { rIdx: 1, name: "Garlic Naan", description: "Tandoor baked naan with garlic", price: 49, category: "Breads", imageUrl: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&q=80", isPopular: true },

  // Udupi Delight (rIdx: 2)
  { rIdx: 2, name: "Masala Dosa", description: "Crispy dosa with potato filling", price: 99, category: "Dosa", imageUrl: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&q=80", isPopular: true },
  { rIdx: 2, name: "Idli (2 pcs)", description: "Soft steamed rice cakes", price: 59, category: "Breakfast", imageUrl: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=400&q=80", isPopular: true },

  // Chaat Junction (rIdx: 3)
  { rIdx: 3, name: "Pani Puri", description: "Crispy puris with spicy tangy water", price: 49, category: "Chaat", imageUrl: "https://images.unsplash.com/photo-1628294896466-9d6f4e5b0b62?w=400&q=80", isPopular: true },

  // Mithai Mahal (rIdx: 4)
  { rIdx: 4, name: "Gulab Jamun (2 pcs)", description: "Soft milk-solid balls in sugar syrup", price: 79, category: "Sweets", imageUrl: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400&q=80", isPopular: true }
];

async function seed() {
  try {
    // 1. Connect to Database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB...");

    // 2. Clear existing data to avoid duplicates
    await Restaurant.deleteMany();
    await MenuItem.deleteMany();
    console.log("Existing data cleared.");

    // 3. Insert Restaurants first to generate IDs
    const insertedRestaurants = await Restaurant.insertMany(RESTAURANTS_DATA);
    console.log(`Successfully inserted ${insertedRestaurants.length} restaurants.`);

    // 4. Map Menu Items to the correct Restaurant Object IDs
    const menuItemsToInsert = MENU_DATA.map((item) => {
      const restaurant = insertedRestaurants[item.rIdx];
      return {
        restaurantId: restaurant._id, // Link to the real DB ID
        name: item.name,
        description: item.description,
        price: item.price,
        category: item.category,
        imageUrl: item.imageUrl, // Uses the URL provided in MENU_DATA
        isAvailable: true,
        isPopular: item.isPopular ?? false,
      };
    });

    // 5. Insert Menu Items
    await MenuItem.insertMany(menuItemsToInsert);
    console.log(`Successfully inserted ${menuItemsToInsert.length} menu items.`);
    // 6. Final Clean up
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
    console.log("✅ Seeding Process Complete!");

    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding Error:", err);
    process.exit(1);
  }
}

seed();