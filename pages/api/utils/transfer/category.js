import db from '@/database/connection'
import { isAuth } from '@/utility'
import nextConnect from 'next-connect'
import axios from 'axios'
import Category from '@/database/model/Category'
const handler = nextConnect()


// handler.use(isAuth) // Optional: remove this if no auth required
handler.get(async (req, res) => {
  await db.connect(); // ensure database connection

  try {
    const { data } = await axios.get("https://ecomerce-phi-gold.vercel.app/api/category?pageSize=1000");
    const categories = data.categories;

    if (!categories || !Array.isArray(categories)) {
      return res.status(400).json({ error: "No valid categories received" });
    }

    // Create promises for all inserts
    const insertPromises = categories.map((cat) => Category.create(cat));

    const results = await Promise.allSettled(insertPromises);

    const inserted = results.filter((r) => r.status === "fulfilled").length;
    const failed = results.filter((r) => r.status === "rejected");

    res.status(201).json({
      message: "Categories processed",
      insertedCount: inserted,
      failedCount: failed.length,
      errors: failed.map((e, i) => ({
        category: categories[i],
        error: e.reason?.message || "Unknown error",
      })),
    });
  } catch (error) {
    console.error("Error copying categories:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default handler
