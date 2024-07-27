// pages/api/revenue/graphical-data.js

import db from '@/database/connection'
import Order from '@/database/model/Order'
import nc from 'next-connect'

const handler = nc()

db.connect()

handler.get(async (req, res) => {
    try {
      // Aggregate orders by month and calculate revenue for each month
      const monthlyRevenueData = await Order.aggregate([
        {
          $match: {
            status: 'Delivered', // Filter orders with completed payment status
          }
        },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
            revenue: { $sum: '$total' } // Sum total field for revenue calculation
          }
        }
      ]);
  
      // Convert the data to a more suitable format for graphical representation
      const graphicalData = monthlyRevenueData.map(({ _id, revenue }) => ({
        month: _id,
        revenue
      }));
  
      res.status(200).json(graphicalData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
export default handler
